import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  hashedPassword: { type: String, required: true },
  otp: { type: String, required: true },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Transgender', 'Other'],
  },
  createdAt: { type: Date, default: Date.now, expires: 120 }//Expires after 2 minutes (120 seconds)
});

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
