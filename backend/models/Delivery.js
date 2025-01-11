import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'delivering', 'delivered'],
        default: 'pending',
    },
    deliveryTime: Date,
    notes: String,
    meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required: true,
    },
});

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;