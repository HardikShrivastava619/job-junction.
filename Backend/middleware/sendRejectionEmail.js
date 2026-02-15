import { rejection_template } from "../config/RejectionEmailTemplate.js";
import { transporter } from "./Emailconfig.js";
import dotenv from "dotenv";
dotenv.config();

export const sendRejectionEmail = async ({email, name, company}) => {
  try {
    const emailHtml = rejection_template
      .replace(/{{NAME}}/g, name)
      .replace(/{{COMPANY}}/g, company);

    const response = await transporter.sendMail({
      from: `${company} <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Application Rejected',
      html: emailHtml,
    });



    console.log(`✅ Email sent: ${response.messageId}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
};
