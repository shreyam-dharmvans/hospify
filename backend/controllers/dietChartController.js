import DietChart from '../models/DietChart.js';

export const createDietChart = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role != 'manager') {
            return res.status(400).json({ message: 'You are not authorized' });
        }
        const dietChart = new DietChart(req.body);
        await dietChart.save();
        res.status(201).json(dietChart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getDietCharts = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role != 'manager') {
            return res.status(400).json({ message: 'You are not authorized' });
        }
        const dietCharts = await DietChart.find()
            .populate('patient')
            .populate('morningMeal')
            .populate('eveningMeal')
            .populate('nightMeal');
        res.json(dietCharts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDietChart = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role != 'manager') {
            return res.status(400).json({ message: 'You are not authorized' });
        }
        const dietChart = await DietChart.findByIdAndDelete(req.params.id)
        if (!dietChart) {
            return res.status(404).json({ message: 'Diet Chart not found' });
        }
        res.json({ message: 'Diet Chart deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}