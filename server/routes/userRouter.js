import express from 'express';
import { signUp, signIn, allUsers, getMe } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/all', allUsers);
router.get('/get-me', getMe);



export default router;