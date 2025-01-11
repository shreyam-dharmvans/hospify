import { useState, useEffect } from 'react';
import axios from 'axios';
import MealCard from '../cards/MealCard';
import PatientCard from '../cards/PatientCard';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ManagerDashboard = ({ user }) => {
    const navigate = useNavigate();
    const [dietChart, setDietChart] = useState([]);
    const [patients, setPatients] = useState([]);
    const [pantryStaff, setPantryStaff] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [stats, setStats] = useState({
        totalPatients: 0,
        activeDietCharts: 0,
        pendingDeliveries: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [patientsRes, dietRes, usersRes, deliveriesRes] = await Promise.all([
                    axios.get('/patients'),
                    axios.get('/diet-chart'),
                    axios.get('/users/pantry'),
                    axios.get('/deliveries')
                ]);
                setPatients(patientsRes.data);
                setDietChart(dietRes.data);
                setPantryStaff(usersRes.data);
                setDelivery(deliveriesRes.data);
                setStats({
                    totalPatients: patientsRes.data.length,
                    activeDietCharts: dietRes.data.length,
                    pendingDeliveries: deliveriesRes.data.filter(d => d.status == 'pending').length
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleOnClick = () => {
        navigate('/patient');
    }

    const handleOnClickDiet = () => {
        navigate('/diet-chart');
    }

    const onAssign = async (meal, dId) => {
        try {
            toast.loading('Assigning meal...', { id: 'assign-meal' });
            const response = await axios.post('/pantry/assign-meal', { mealId: meal._id });
            if (response.status === 200) {
                toast.success(response.data.message, { id: 'assign-meal' });
                setDietChart((prevDietChart) => {
                    if (prevDietChart._id == dId) {
                        if (meal._id == prevDietChart.morningMeal._id) {
                            return {
                                ...prevDietChart,
                                morningMeal: meal
                            }
                        } else if (meal._id == prevDietChart.eveningMeal._id) {
                            return {
                                ...prevDietChart,
                                eveningMeal: meal
                            }
                        } else if (meal._id == prevDietChart.nightMeal._id) {
                            return {
                                ...prevDietChart,
                                nightMeal: meal
                            }
                        }
                    }
                }
                )
            }
        } catch (error) {
            console.log(error);
            return toast.error(error.response.data.message, { id: 'assign-meal' });
        }
    }

    return (
        <div className="p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500">Total Patients</h3>
                    <p className="text-3xl font-bold">{stats.totalPatients}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500">Active Diet Charts</h3>
                    <p className="text-3xl font-bold">{stats.activeDietCharts}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500">Pending Deliveries</h3>
                    <p className="text-3xl font-bold">{stats.pendingDeliveries}</p>
                </div>
            </div>

            {/* Patients Section */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Patients</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button onClick={handleOnClick} className='text-blue-700'>Add Patient</button>
                    {patients.map(patient => (
                        <PatientCard key={patient._id} patient={patient} />
                    ))}
                </div>
            </div>

            {/* Diet Charts Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Diet Charts</h2>
                    <button
                        onClick={handleOnClickDiet}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add Diet Chart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {dietChart.map((d) => (
                        <div key={d._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{d.patient.name}</h3>
                                    <p className="text-sm text-gray-500">Room {d.patient.roomNumber}</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    Active
                                </span>
                            </div>

                            <div className="grid gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-md font-medium text-gray-700 mb-2">Morning Meal</h4>
                                    <MealCard key={`morning-${d._id}`} meal={d.morningMeal} onAssign={onAssign} dId={d._id} />
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-md font-medium text-gray-700 mb-2">Evening Meal</h4>
                                    <MealCard key={`evening-${d._id}`} meal={d.eveningMeal} onAssign={onAssign} dId={d._id} />
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-md font-medium text-gray-700 mb-2">Night Meal</h4>
                                    <MealCard key={`night-${d._id}`} meal={d.nightMeal} onAssign={onAssign} dId={d._id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;