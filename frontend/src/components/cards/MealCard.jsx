import axios from "axios";
import toast from "react-hot-toast";

const MealCard = ({ meal, onAssign, dId }) => {


    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
                <span className="px-2 py-1 rounded text-sm">
                    {meal.status}
                </span>
            </div>
            <div className="mt-2">
                <p className="text-sm">Ingredients: {meal.ingredients}</p>
                <p className="text-sm">Instructions: {meal.instructions}</p>
                {meal.status == 'unassigned' && (
                    <button
                        onClick={() => onAssign(meal, dId)}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Assign to Staff
                    </button>
                )}
            </div>
        </div>
    );
};

export default MealCard;