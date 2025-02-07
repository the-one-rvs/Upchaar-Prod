// Define the function to generate the email HTML with the user's name
const cancelService = (name,brand,series) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Cancellation Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #004085;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #007bff;
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
        <h1>Confirmation of Your Service Cancellation.</h1>
        <p>Dear ${name},</p>
        <p>We have successfully received your request to cancel the service.</strong>. We're sorry to see you go but we understand that plans can change.</p>
        <h2>Cancelled Service Details:</h2>
        <ul>
        <li>Brand Name: ${brand}</li>
        <li>Series: ${series}</li>

        </ul>
        <p>If you canceled this service by mistake or if you have any questions, please don't hesitate to contact our support team. We're here to help and can assist you with rescheduling or any other concerns you might have.</p>
        <p>Thank you for considering our services, and we hope to serve you in the future.</p>
          
            <p>Best regards,</p>
            <p>The Machinevice Team</p>
            <a href="https://www.machinevice.com" class="button">Visit our website</a>
        </div>
        <div class="footer">
            &copy; 2024 Machinevice. All rights reserved.
        </div>
    </div>
</body>
</html>

`;

// Export the function
export { cancelService };
