import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoffeeShow = () => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [viewCoffee, setViewCoffee] = useState({});
    const [reviews, setReviews] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:3000/api/v1/coffee/${params.id}`)
            .then((response) => {
                console.log(response.data.coffee.image_url)
                setViewCoffee(response.data.coffee);
                setReviews(response.data.reviews);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/review?coffee_id=${params.id}`, {
                comment,
            });
            setReviews([...reviews, response.data.review]);
            setComment('');
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error.response.data.error);
        }
    };
    const deleteReview = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/review/${id}`);
            setReviews(reviews.filter((review) => review.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col m-8 h-screen bg-gray-100 text-gray-700">
            <div className="flex flex-col md:flex-row md:justify-between w-full items-start">
                <div className="w-full md:w-1/2 lg:w-1/3 md:mr-4 lg:mr-8 mb-8 md:mb-0">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-xl font-bold mb-2">{viewCoffee.name}</h2>
                        {viewCoffee.image_url && <img src={`http://localhost:3000${viewCoffee.image_url}`} alt={viewCoffee.name} className="w-full mb-4" />}
                    </div>
                </div>
                <div className="w-full md:w-2/4 lg:w-2/4 mt-8 md:mt-0">
                    <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-8 w-full">
                        <label className="font-semibold text-sm" htmlFor="commentField">
                            Add a Comment
                        </label>
                        <textarea
                            className="h-32 px-4 py-2 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 resize-none w-full"
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                        {error && <div className="text-red-600 mt-2">{error}</div>}
                        <button
                            type="submit"
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
                        >
                            Comment
                        </button>
                    </form>
                </div>
            </div>
            <h1 className='text-center py-4 text-lg'>Reviews</h1>
            <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-lg shadow-lg p-8">
                        <p className="text-lg font-medium">{review.comment}</p>
                        <button onClick={() => deleteReview(review.id)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow mt-4">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default CoffeeShow;
