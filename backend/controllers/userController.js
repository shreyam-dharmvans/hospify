import User from "../models/User.js";

export const getDeliveryUsers = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role == 'delivery') {
            return res.status(400).json({ message: 'You are not authorized' });
        }
        const users = await User.find({ role: 'delivery' });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPantryUsers = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role != 'manager') {
            return res.status(400).json({ message: 'You are not authorized' });
        }
        const users = await User.find({ role: 'pantry' });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}