// Define the function to generate the email HTML with the user's name
const registerMail = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Machinevice!</title>
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
    <h1>You've Joined Machinevice - We the Troubleshooters</h1>
    <p>Hi ${name},</p>
    <p>Thank you for registering on our website. We're excited to have you as part of the Machinevice community!</p>
    <p>Now you can create and publish your own post or request for a service. Click login to start - <a href="https://machinevice.com/login">Login</a></p>
    <p>If you have any questions or need assistance, feel free to reply to this email or visit our <a href="https://www.machinevice.com">Website</a>.</p>
    <p>Best regards,<br>The Machinevice Team</p>
    <a href="https://www.machinevice.com" class="button">Visit our website</a>
    <div class="footer">
      <p>Machinevice - INDIA</p>
      <p>&copy; 2024 Machinevice. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// Export the function
export { registerMail };
