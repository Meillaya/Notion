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

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Reset Your Password',
    text: `Click the following link to reset your password: ${resetUrl}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Reset Your Password</h1>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Reset Password
        </a>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `,
  });
}

export async function sendVerificationEmail(email: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Verify Your Email',
    text: `Your verification code is: ${code}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to Our Platform</h1>
        <p>Your verification code is:</p>
        <h2 style="letter-spacing: 3px; font-size: 32px;">${code}</h2>
        <p>This code will expire in 15 minutes.</p>
      </div>
    `,
  });
}