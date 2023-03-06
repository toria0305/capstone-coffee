import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/${localStorage.getItem('user_id')}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, []);
    return (
        <div className="container mx-auto my-24">
            {user ? (
                <>
                    <h1 className="font-bold text-2xl">{user.username}</h1>
                    <p className="text-gray-700">{user.first_name} {user.last_name}</p>
                    <p className="text-gray-700">{user.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
