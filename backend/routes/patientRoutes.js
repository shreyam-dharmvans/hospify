import express from 'express';
const router = express.Router();
import { createPatient, deletePatient, getPatient, getPatients } from '../controllers/patientController.js';
import { verifyToken } from '../middleware/auth.js';




router.post('/', verifyToken, createPatient);
router.get('/', verifyToken, getPatients);
router.get('/:id', verifyToken, getPatient);
router.delete('/:id', verifyToken, deletePatient);
export default router;