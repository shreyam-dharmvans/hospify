import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DietChartForm = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({
        patient: '',
        morningMeal: { ingredients: '', instructions: '' },
        eveningMeal: { ingredients: '', instructions: '' },
        nightMeal: { ingredients: '', instructions: '' }
    });

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('/patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create meals first
            const [morningMeal, eveningMeal, nightMeal] = await Promise.all([
                axios.post('/pantry', {
                    ingredients: formData.morningMeal.ingredients,
                    instructions: formData.morningMeal.instructions
                }),
                axios.post('/pantry', {
                    ingredients: formData.eveningMeal.ingredients,
                    instructions: formData.eveningMeal.instructions
                }),
                axios.post('/pantry', {
                    ingredients: formData.nightMeal.ingredients,
                    instructions: formData.nightMeal.instructions
                })
            ]);

            console.log(morningMeal, eveningMeal, nightMeal);

            // Create diet chart with meal references
            const dietChartData = {
                patient: formData.patient,
                morningMeal: morningMeal.data,
                eveningMeal: eveningMeal.data,
                nightMeal: nightMeal.data
            };

            toast.loading('Creating diet chart...', { id: 'diet-chart' });
            const response = await axios.post('/diet-chart', dietChartData);

            if (response.status === 200) {
                toast.success(response.data.message, { id: 'diet-chart' });
            }

            // Reset form
            setFormData({
                patient: '',
                morningMeal: { ingredients: '', instructions: '' },
                eveningMeal: { ingredients: '', instructions: '' },
                nightMeal: { ingredients: '', instructions: '' }
            });

            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating diet chart:', error);
            toast.error("internal server error", { id: 'diet-chart' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select
                    value={formData.patient}
                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                        <option key={patient._id} value={patient._id}>
                            {patient.name} - Room {patient.roomNumber}
                        </option>
                    ))}
                </select>
            </div>

            {['morningMeal', 'eveningMeal', 'nightMeal'].map((mealType) => (
                <div key={mealType} className="border p-4 rounded">
                    <h3 className="text-lg font-medium mb-4">
                        {mealType.replace('Meal', '').charAt(0).toUpperCase() + mealType.replace('Meal', '').slice(1)} Meal
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Ingredients (comma-separated)
                            </label>
                            <input
                                type="text"
                                value={formData[mealType].ingredients}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    [mealType]: { ...formData[mealType], ingredients: e.target.value }
                                })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Instructions
                            </label>
                            <textarea
                                value={formData[mealType].instructions}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    [mealType]: { ...formData[mealType], instructions: e.target.value }
                                })}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                                rows="3"
                                required
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Create Diet Chart
                </button>
            </div>
        </form>
    );
};

export default DietChartForm;