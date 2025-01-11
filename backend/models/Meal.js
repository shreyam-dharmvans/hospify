import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    ingredients: [{
        type: String,
        required: true,
    }],
    instructions: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'unassigned',
        enum: ['unassigned', 'assigned', 'pending', 'completed'],
    },
});

const Meal = new mongoose.model('Meal', mealSchema);
export default Meal;