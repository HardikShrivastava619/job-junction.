import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


dotenv.config();

export const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
 