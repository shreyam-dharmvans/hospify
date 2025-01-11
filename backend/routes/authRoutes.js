import express from 'express';
const router = express.Router();
import { login, logout, sendUserData } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

router.post('/login', login);
router.delete('/logout', logout);
router.get('/loggedin', verifyToken, sendUserData);
export default router;