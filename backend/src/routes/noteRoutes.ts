import { Router } from 'express';
import { createNote, getNotes } from '../controllers/noteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createNote);
router.get('/', authMiddleware, getNotes);

export default router;
