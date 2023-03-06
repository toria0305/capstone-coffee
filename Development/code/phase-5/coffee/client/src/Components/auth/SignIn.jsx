import React, {useState} from 'react';
import axios from 'axios';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    if (localStorage.getItem('token')) {
        window.location.href = '/';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/api/v1/authentication/sign_in', {
                email,
                password
            });
            // handle successful login
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id', response.data.user_id);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
            setError(error.response.data.error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
            <h1 className="font-bold text-2xl">Sign In</h1>
            <h5 className="text-gray">Welcome To Coffee :)</h5>
            <form onSubmit={handleSubmit} className="flex flex-col bg-white rounded shadow-lg p-12 mt-12">

                <label className="font-semibold text-xs" htmlFor="usernameField">Email</label>
                <input
                    className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
                <input
                    className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <div>{error}</div>}
                <button type="submit"
                        className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Sign
                    In
                </button>
            </form>
        </div>
    );
}

export default SignIn;
