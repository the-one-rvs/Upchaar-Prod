// Define the function to generate the email HTML with the user's name
const serviceMail = (name,brand,series,model,problem) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Booking Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px;
            background-color: #4CAF50;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            color: #333333;
        }
        .content p {
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            color: #333;
            background-color: #e0e0e0; /* Lighter color */
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
            text-align: center;
            transition: background-color 0.3s ease;
            border: 1px solid #ccc;
          }
        
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Woohoo! Your Service is Booked! 🎉</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for booking a service with us at Machinevice. We are pleased to confirm that your service booking has been successfully processed.</p>
            <p>We can't wait to assist you and make everything just right!</p>
            <p><strong>Your Machine Details:</strong></p>
            <ul>
                <li>Brand Name: ${brand}</li>
                <li>Series: ${series}</li>
                <li>Model: ${model}</li>
                <li>Problem: ${problem}</li>
                </ul>
                <h2>We will contact you shortly with a meeting link. Kindly join the meeting for your machine to be serviced.</h2>
            <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
            <p>We look forward to serving you!</p>
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
export { serviceMail };
