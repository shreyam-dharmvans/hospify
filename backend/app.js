import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import pantryRoutes from './routes/pantryRoutes.js';
import dietChartRoutes from './routes/dietChartRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './utils/db.js';

if (process.env.NODE_ENV != "production") {
    dotenv.config();
}

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


await connectDB();
app.use('/api/pantry', pantryRoutes);
app.use('/api/diet-chart', dietChartRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));