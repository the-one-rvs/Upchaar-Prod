import { sendMail } from "../helpers/sendMail.js";

export const passwordResetSuccessMail = () => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; text-align: center; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; text-align: left;">
        <h2>Hello Member,</h2>
        <p>Your password has been successfully reset.</p>
        <p>If you did not request this change or believe there has been an error, please contact our support team immediately.</p>
        <br/>
        <a href="www.machinevice.com" 
           style="display: inline-block; padding: 10px 20px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px;">
          Visit Our Website
        </a>
        <br/><br/>
        <p>If you need any help or support, please contact us at: <a href="mailto:help-support@machinevice.com" style="color: #007bff;">help-support@machinevice.com</a></p>
        <br/>
        <p>Thank you,<br/>The MachineVice Team</p>
      </div>
    </div>
  `;
};
