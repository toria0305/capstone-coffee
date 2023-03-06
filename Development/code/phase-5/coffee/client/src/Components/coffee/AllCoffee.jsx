import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default function AllCoffee() {
    const [coffeeData, setCoffeeData] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:3000/api/v1/coffee')
            .then((response) => {
                console.log(response.data)
                setCoffeeData(response.data.coffee);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="m-8">
            <div className="coffee-grid">
                {coffeeData.map((coffee) => (
                    <div key={coffee.id} className="coffee-item">
                        <img
                            src={`http://localhost:3000${coffee.image_url}`}
                            alt={coffee.name}
                            className="w-full mb-4"
                        />
                        <NavLink
                            to={`/showcoffee/${coffee.id}`}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            View
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}
