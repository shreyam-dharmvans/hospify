import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            toast.loading("Logging out...", { id: 'logout' });
            const response = await axios.delete('/auth/logout');
            if (response.status === 200) {
                toast.success(response.data.message, { id: 'logout' });
                setUser(null);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { id: 'logout' });
        }
    }

    return (
        <nav className="bg-white shadow border-b-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold text-gray-800" onClick={() => navigate('/dashboard')}>
                            Hospital Food Management
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-4 text-gray-600">
                            {user?.email}
                        </span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
