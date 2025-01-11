import mongoose from 'mongoose';

const dietChartSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    morningMeal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required: true,
    },
    eveningMeal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required: true,
    },
    nightMeal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required: true,
    },
});

const DietChart = mongoose.model('DietChart', dietChartSchema);
export default DietChart;
