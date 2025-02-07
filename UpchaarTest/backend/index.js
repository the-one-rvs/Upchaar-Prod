import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import path from 'path';
import { default as authRoutes } from './src/routes/auth.route.js';
import cors from 'cors'


config();

connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


const __dirname = path.resolve();


const app = express();
app.use(cors());


app.use(json()); // Allows parsing of JSON data

app.use("/api/auth",authRoutes)


// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if statusCode not provided
  const message = err.message || 'Internal Server Error'; // Default message

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
