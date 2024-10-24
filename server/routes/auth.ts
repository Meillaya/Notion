import express from 'express';
import { z } from 'zod';
import { generateAuthCode, verifyAuthCode } from '../services/auth';
import { createUser, findUserByEmail } from '../services/users';
import { sendAuthCode } from '../services/email';

const router = express.Router();

const emailSchema = z.object({
  email: z.string().email(),
});

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

router.post('/login', async (req, res) => {
  try {
    const { email } = emailSchema.parse(req.body);
    let user = await findUserByEmail(email);
    
    if (!user) {
      user = await createUser(email);
    }

    const code = await generateAuthCode(user.id);
    
    try {
      await sendAuthCode(email, code);
      res.json({ message: 'Auth code sent' });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // For development, return the code in the response
      // Remove this in production!
      res.json({ message: 'Auth code sent', code });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: 'Invalid request' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { email, code } = verifySchema.parse(req.body);
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const token = await verifyAuthCode(user.id, code);
    if (!token) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }

    res.json({ token });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(400).json({ error: 'Invalid request' });
  }
});

export const authRouter = router;