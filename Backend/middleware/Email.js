import { verification_template } from '../config/EmailTempelate.js';
import { transporter } from './Emailconfig.js';

import dotenv from 'dotenv'; 
dotenv.config();



export const sendVerificationCode = async (email, verificationCode) => {
  try { 
    const response = await transporter.sendMail({
      from: `JobJunctionSMTP <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Verify your Email',
      text: 'Verify your Email',
      html: verification_template.replace('123456', verificationCode),
    });

    console.log(`✅ Email sent: ${response.messageId}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
};
 