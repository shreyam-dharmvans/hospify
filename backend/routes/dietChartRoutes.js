import express from 'express';
import { createDietChart, deleteDietChart, getDietCharts } from '../controllers/dietChartController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();


router.post('/', verifyToken, createDietChart);
router.get('/', verifyToken, getDietCharts);
router.delete('/:id', verifyToken, deleteDietChart);

export default router;