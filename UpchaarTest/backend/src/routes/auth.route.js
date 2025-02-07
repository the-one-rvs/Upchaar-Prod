import express from 'express';


import { cancelRegistration, forgotPassword, login, resetPassword, signup, verifyOtpAndRegister } from '../controller/auth.controller.js';

const authRoutes = express.Router();

// Standard login and signup routes
authRoutes.post('/patient/signup',  signup);
authRoutes.post('/patient/login', login);
authRoutes.post('/patient/verify-otp', verifyOtpAndRegister);
authRoutes.post('/forgot-password', forgotPassword);
authRoutes.post('/reset-password', resetPassword);
authRoutes.post('/patient/cancel-registration',cancelRegistration);




export default authRoutes;
