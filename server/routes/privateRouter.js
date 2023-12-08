import express from 'express';
const router = express.Router();
import { addMessage, getMessage } from '../controllers/messageController.js';

router.post('/add-msg', addMessage);
router.get('/get-msg', getMessage);

export default router;