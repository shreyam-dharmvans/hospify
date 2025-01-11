import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { assignMeal, createMeal, getMeals } from '../controllers/pantryController.js';


const router = express.Router();

router.post('/', verifyToken, createMeal);
router.post('/assign-meal', verifyToken, assignMeal);
router.get('/meals', verifyToken, getMeals);


export default router;
