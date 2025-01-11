import express from 'express';
const router = express.Router();
import { verifyToken } from '../middleware/auth.js';
import { getDeliveryUsers, getPantryUsers } from '../controllers/userController.js';




router.get('/pantry', verifyToken, getPantryUsers);
router.get('/delivery', verifyToken, getDeliveryUsers);

export default router;