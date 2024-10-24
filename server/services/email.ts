import nodemailer from 'nodemailer';
import { EMAIL_FROM, EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } from '../config';

const transporter = nodemailer.createTransport({
  host: EMAIL_SERVICE,
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function sendAuthCode(email: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Your Login Code',
    text: `Your verification code is: ${code}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to Notion Clone</h1>
        <p>Your verification code is:</p>
        <h2 style="letter-spacing: 3px; font-size: 32px;">${code}</h2>
        <p>This code will expire in 15 minutes.</p>
      </div>
    `,
  });
}