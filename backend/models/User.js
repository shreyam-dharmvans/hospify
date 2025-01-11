import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['manager', 'pantry', 'delivery'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String,
        required: true,
    },
    assignedMeals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }],
    assignedDeliveries: [{
        type: Schema.Types.ObjectId,
        ref: 'Delivery'
    }]
});


const User = mongoose.model('User', userSchema);
export default User;
