import express from 'express';
const router = express.Router();
import { assignDelivery, getDeliveries, updateDeliveryStatus } from '../controllers/deliveryController.js';
import { verifyToken } from '../middleware/auth.js';


router.post('/:id', verifyToken, assignDelivery);
router.patch('/:id/status', verifyToken, updateDeliveryStatus);
router.get('/', verifyToken, getDeliveries);


export default router;