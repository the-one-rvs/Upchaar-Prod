import { sendMail } from "../helpers/sendMail.js";

export const resetPasswordMail = (name, resetUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; text-align: center; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; text-align: left;">
        <h2>Hello ${name},</h2>
        <p>You requested a password reset for your account.</p>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>If you did not request this, please ignore this email.</p>
        <p>This link will expire in 5 minutes for your security.</p>
        <br/>
        <a href="${process.env.CLIENT_URL}" 
           style="display: inline-block; padding: 10px 20px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px;">
          Visit Our Website
        </a>
        <br/><br/>
        
        <p>Thank you,<br/>Team UPCHAAR</p>
      </div>
    </div>
  `;
};
