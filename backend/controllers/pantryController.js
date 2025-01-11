import Meal from '../models/Meal.js';
import User from '../models/User.js';

export const assignMeal = async (req, res) => {
  try {
    const { id, role } = res.locals.jwtData;
    if (role != 'manager') {
      return res.status(400).json({ message: 'You are not authorized' });
    }
    const { mealId } = req.body;
    const meal = await Meal.findById(mealId);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    const users = await User.find({ role: 'pantry' });
    const user = users.reduce((min, user) => user.assignedMeals.length < min.assignedMeals.length ? user : min);

    user.assignedMeals.push(meal._id);
    await user.save();
    meal.status = 'assigned';
    await meal.save();

    return res.status(200).json({ message: 'Meal assigned' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getMeals = async (req, res) => {
  try {
    const { id, role } = res.locals.jwtData;
    if (role != 'manager') {
      return res.status(400).json({ message: 'You are not authorized' });
    }
    const meals = await Meal.find();
    return res.status(200).json(meals);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const createMeal = async (req, res) => {
  try {
    const { id, role } = res.locals.jwtData;
    if (role != 'manager') {
      return res.status(400).json({ message: 'You are not authorized' });
    }
    const meal = new Meal(req.body);
    await meal.save();
    return res.status(201).json(meal);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}