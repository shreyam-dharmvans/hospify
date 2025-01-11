import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ user, setUser }) => {
    const navigate = useNavigate();
    if (user) {
        navigate('/dashboard');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            toast.loading("Logging in...", { id: 'login' });
            const response = await axios.post('/auth/login', { email, password });
            if (response.status === 200) {
                toast.success(response.data.message, { id: 'login' });
                setUser(response.data.user);
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error(err.response.data.message, { id: 'login' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow border-slate-800 border-2">
                <h2 className="text-3xl font-bold text-center text-gray-900">
                    Hospital Food Management System
                </h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
