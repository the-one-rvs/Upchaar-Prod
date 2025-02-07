import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from 'dotenv';
import { Router } from "express";
import Token from "../models/token.model.js";
import { resetPasswordMail } from '../helpers/resetPasswordMail.js';
import crypto from 'crypto';
import { passwordResetSuccessMail } from "../helpers/passwordResetDone.js";
import bcryptjs from 'bcryptjs';
import otpGenerator from 'otp-generator';
import OTP from "../models/otp.model.js";
import { errorHandler } from "../../utils/error.js";
import { sendMail } from "../helpers/sendMail.js";
import { otpMail } from "../helpers/otpService.js";
import User from "../models/user.model.js";

dotenv.config();

const router = Router();

export const signup = async (req, res, next) => {
  const { name, email, password,phone,
    dob,
    gender, } = req.body;

  if (!name || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const otp = otpGenerator.generate(7, {
      upperCaseAlphabets: false,
      specialChars: false,
      alphabets: false,
      lowerCaseAlphabets: false,
    });

 
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Temporarily store the OTP record
    const otpRecord = new OTP({
      name,
      email,
      hashedPassword,
      dob,
      phone,
      gender,
      otp,
      expiresAt: Date.now() + 1 * 60 * 1000, // OTP valid for 10 minutes
    });

    await otpRecord.save();
  

    // Send OTP to the user via email (or SMS)
    await sendMail(email, "OTP for UPCHAAR Registration", "", otpMail(name, otp));

    res.json({ message: "OTP sent to your email. Please verify to complete registration." });
  } catch (err) {
    next(err);
  }
};

// Add a separate route/controller for verifying OTP and completing registration
export const verifyOtpAndRegister = async (req, res, next) => {
  const { email, otp, password, } = req.body;

  if (!email || !otp || !password) {
    return next(errorHandler(400, "Email, OTP, and password are required"));
  }

  try {
    // Find OTP record
    const otpRecord = await OTP.findOne({ email: email.trim().toLowerCase() });

    if (!otpRecord) {
      return next(errorHandler(400, "No OTP record found"));
    }

    if (otpRecord.otp !== otp) {
      return next(errorHandler(400, "Invalid OTP"));
    }

  
    // Create a new user record
    const newUser = new User({
      name: otpRecord.name,
      email: otpRecord.email,
      phone: otpRecord.phone,
      dob: otpRecord.dob,
      gender: otpRecord.gender,
      password: otpRecord.hashedPassword,
    
    });

    await newUser.save();

    // Remove OTP record after successful registration
    await OTP.deleteOne({ email, otp });

    res.json({ message: "Registration successful" });
  } catch (err) {
    next(err);
  }
};

export const cancelRegistration = async (req, res) => {
  const { email } = req.body;

  try {
      // Remove any existing OTP for the user
      await OTP.deleteOne({ email });
      res.status(200).json({ message: "Registration canceled. OTP removed." });
  } catch (error) {
      res.status(500).json({ message: "Failed to cancel registration." });
  }
};



export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User NOT found, Register to login"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password or Email"));
    }

    const tokenjwt = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    const { password: pass, ...rest } = validUser._doc;
   
    res.status(200).json(rest);
    
  } catch (error) {
    next(error);
  }
};


export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the token
    

    // Save the token in the database
    const token = new Token({
      userId: user._id,
      token: resetToken,
      createdAt: Date.now(), // Add creation timestamp
    });
    await token.save();

    // Construct reset URL
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    sendMail(
      user.email,
      "Password Reset Request",
      "",
      resetPasswordMail(user.name, resetUrl)
    );

    res.json({ message: "Password reset email sent. Please check your inbox." });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    

    // Find the reset token in the database
    const storedToken = await Token.findOne({ token });
    if (!storedToken) {
      return next(errorHandler(400, "Invalid or expired password reset token"));
    }

    // Optional: Check token expiration
    const tokenAge = Date.now() - storedToken.createdAt;
    const tokenExpiry = 5 * 60 * 1000; // 1 hour expiration time
    if (tokenAge > tokenExpiry) {
      await Token.deleteOne({ token });
      return next(errorHandler(400, "Token has expired"));
    }

    // Find the user by the ID stored in the token
    const user = await User.findById(storedToken.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Hash the new password and save it
    const hashedPassword = bcryptjs.hashSync(password, 10);
    user.password = hashedPassword;
    await user.save();

    // Remove the token after a successful password reset
    await Token.deleteOne({ token });

    sendMail(user.email, "Password Reset Successfully", "",passwordResetSuccessMail());

    res.json({ message: "Password has been reset successfully" });
  } catch (err) {
    next(err);
  }
};









