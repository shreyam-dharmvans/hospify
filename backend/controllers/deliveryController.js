import Delivery from '../models/Delivery.js';

export const assignDelivery = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role == 'delivery') {
            return res.status(400).json({ message: 'You are not authorized' });
        }
        const delivery = new Delivery(req.body);
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await delivery.save();
        user.assignedDeliveries.push(delivery._id);
        await user.save();

        res.status(201).json(delivery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDeliveryStatus = async (req, res) => {
    try {

        const delivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDeliveries = async (req, res) => {
    try {
        const { id, role } = res.locals.jwtData;
        if (role == 'delivery') {
            return res.status(400).json({ message: 'You are not authorized' });
        }
        const deliveries = await Delivery.find();
        return res.status(200).json(deliveries);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
