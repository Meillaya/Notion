import express from 'express';
import { z } from 'zod';
import {
  registerUser,
  loginUser,
  initiatePasswordReset,
  resetPassword,
} from '../services/auth';

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = registerSchema.parse(req.body);
    const user = await registerUser(email, password);
    res.json({ message: 'Registration successful', userId: user.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const { token } = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error('Login error:', error);
      res.status(401).json({ error: 'Invalid email or password' });
    }
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(req.body);
    await initiatePasswordReset(email);
    res.json({ message: 'If the email exists, reset instructions have been sent' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error('Password reset request error:', error);
      res.status(500).json({ error: 'Failed to process reset request' });
    }
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = resetPasswordSchema.parse(req.body);
    await resetPassword(token, password);
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      console.error('Password reset error:', error);
      res.status(500).json({ error: 'Failed to reset password' });
    }
  }
});

export const authRouter = router;