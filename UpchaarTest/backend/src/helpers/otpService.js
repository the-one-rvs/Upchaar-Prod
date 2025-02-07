
// Define the function to generate the OTP email HTML with the user's name and OTP
const otpMail = (name, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #ff0000;
    }
    p {
      font-size: 16px;
      line-height: 1.5; 
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      color: #ffffff;
      background-color: #ccdae8;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      margin-top: 10px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
   
    <p>Hi ${name},</p>
    <p>Thank you for registering on UPCHAAR. To complete your registration, please use the following OTP code:</p>
    <p style="font-size: 24px; font-weight: bold; color: #ff0000;">${otp}</p>
    <p>Enter this code on our website to verify your email address.Valid for 2 minutes only.</p>
    <p>Best regards,<br>Team UPCHAAR</p>
    <a href="https://www.upchaar.com" class="button">Visit our website</a>
    <div class="footer">
      <p>UPCHAAR - YOUR A.I. HEALTHCARE PARTNER</p>
      <p>&copy; 2024 UPCHAAR INDIA. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// Export the function
export { otpMail };
