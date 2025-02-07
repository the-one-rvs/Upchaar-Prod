import mongoose from 'mongoose';

// Define the schema for user registration
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
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
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
    
},{
    timestamps: true,
  
});

const User = mongoose.model('User', userSchema);

export default User;
