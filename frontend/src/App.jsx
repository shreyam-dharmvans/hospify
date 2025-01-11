import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import Navbar from './components/layout/Navbar';

import { useEffect, useState } from 'react';
import DashBoard from './pages/DashBoard';
import PatientForm from './components/patients/PatientForm';
import DietChartForm from './components/diet/DietChartForm';
import axios from 'axios';




const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/auth/loggedin');
        setUser(response.data);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error checking if user is logged in:', error);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<LoginForm user={user} setUser={setUser} />} />
        <Route path='/dashboard' element={<DashBoard user={user} />} />
        <Route path='/patient' element={<PatientForm />} />
        <Route path='/diet-chart' element={<DietChartForm />} />
      </Routes>
    </>
  );
};

export default App;
