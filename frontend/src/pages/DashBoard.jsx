import React, { useEffect } from 'react'
import ManagerDashboard from '../components/dashboard/ManagerDashboard'
// import PantryDashboard from '../components/dashboard/PantryDashboard'
// import DeliveryDashboard from '../components/dashboard/DeliveryDashboard'
import { useNavigate } from 'react-router-dom'

const DashBoard = ({ user }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, []);


    return (
        <div>
            {user.role === 'manager' && <ManagerDashboard user={user} />}
            {/* {user.role === 'pantry' && <PantryDashboard user={user} />}
            {user.role === 'delivery' && <DeliveryDashboard user={user} />} */}
        </div>
    )
}

export default DashBoard