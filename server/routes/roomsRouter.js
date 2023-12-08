import express from 'express';
const router = express.Router();
import { newRoom, getRooms } from "../controllers/roomController.js";

router.post('/add-room', newRoom);
router.get('/get-rooms', getRooms);

export default router;