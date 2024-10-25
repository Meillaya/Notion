import express from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { createPage, updatePage, getUserPages, getPage } from '../services/pages';

const router = express.Router();

// Middleware to verify JWT token
const auth = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const updatePageSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

router.post('/', auth, async (req, res) => {
    try {
        const page = await createPage(req.userId);
        res.json(page);
    } catch (error) {
        console.error('Create page error:', error);
        res.status(500).json({ error: 'Failed to create page' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = updatePageSchema.parse(req.body);
        const page = await updatePage(Number(id), req.userId, updates);
        res.json(page);
    } catch (error) {
        console.error('Update page error:', error);
        res.status(500).json({ error: 'Failed to update page' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const pages = await getUserPages(req.userId);
        res.json(pages);
    } catch (error) {
        console.error('Get pages error:', error);
        res.status(500).json({ error: 'Failed to get pages' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const page = await getPage(Number(id), req.userId);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }
        res.json(page);
    } catch (error) {
        console.error('Get page error:', error);
        res.status(500).json({ error: 'Failed to get page' });
    }
});

export const pagesRouter = router;