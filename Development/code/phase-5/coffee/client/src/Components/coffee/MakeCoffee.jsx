import React, { useState } from 'react';
import axios from 'axios';

export default function MakeCoffee() {
    const [coffeeName, setCoffeeName] = useState('');
    const [coffeeImage, setCoffeeImage] = useState(null);
    const [coffeeShop, setCoffeeShop] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', coffeeName);
            formData.append('image', coffeeImage);
            formData.append('shop', coffeeShop);

            const response = await axios.post('http://127.0.0.1:3000/api/v1/coffee', formData);
            console.log(response.data); // handle response data here
        } catch (error) {
            console.error(error); // handle error here
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl mb-4">Make Coffee</h1>
            <form onSubmit={ handleSubmit }>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="coffeeName">
                        Coffee Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="coffeeName"
                        type="text"
                        value={ coffeeName }
                        onChange={ (event) => setCoffeeName(event.target.value) }
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="coffeeImage">
                        Coffee Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="coffeeImage"
                        type="file"
                        onChange={ (event) => setCoffeeImage(event.target.files[0]) }
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="coffeeShop">
                        Coffee Shop
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="coffeeShop"
                        type="text"
                        value={ coffeeShop }
                        onChange={ (event) => setCoffeeShop(event.target.value) }
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
