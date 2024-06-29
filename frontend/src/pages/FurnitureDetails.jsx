import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm';

// const stripePromise = loadStripe('your-publishable-key-here');

const FurnitureDetails = ({ allFurniture, isLoggedIn, cart, setCart }) => {
    const { id } = useParams();
    const furnitureItem = allFurniture.find(item => item.id === id);
    const [days, setDays] = useState(1); // Default days value
    const [clientSecret, setClientSecret] = useState(''); // Add missing state

    if (!furnitureItem) {
        return <div>Furniture not found</div>;
    }

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const [numRenters, setNumRenters] = useState(1);

    const contactDetailsRef = useRef(null);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        console.log('handleAddToCart called');  // Log to check if function is called
        const newCartItem = {
            id: furnitureItem.id,
            name: furnitureItem.name,
            rentalPrice: furnitureItem.rentalPrice,
            days: days,
            totalPrice: furnitureItem.rentalPrice * days,
        };
        console.log('Adding item to cart:', newCartItem);  // Log the item being added
        setCart(prevCart => [...prevCart, newCartItem]);
    };

    const calculateTotalPrice = () => {
        let total = furnitureItem.rentalPrice * numRenters;
        return total;
    };

    const handleBookNow = async () => {
        try {
            const response = await fetch('http://localhost:3001/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: furnitureItem.rentalPrice * days * 100 }),
            });
            const data = await response.json();
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8 p-2">
            <div className="flex flex-wrap items-center">
                <div className="w-full sm:w-1/2 mb-8">
                    <img src={furnitureItem.imageUrl} alt={furnitureItem.name} className="w-full h-auto object-cover rounded-md shadow-lg" />
                </div>
                <div className="w-full sm:w-1/2 px-4">
                    <h2 className="text-3xl font-bold mb-4">{furnitureItem.name}</h2>
                    <p className="text-gray-600 mb-4">{furnitureItem.description}</p>
                    <span className={`mt-4 rounded py-1 ${furnitureItem.availabilityStatus === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                        {furnitureItem.availabilityStatus}
                    </span>

                    <div className="flex items-center mb-4 mt-2">
                        <h3 className="text-lg font-semibold">Category:</h3>
                        <span className="text-gray-700 ml-2">{furnitureItem.category}</span>
                    </div>

                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold">Material:</h3>
                        <span className="text-gray-700 ml-2">{furnitureItem.attributes.material}</span>
                    </div>

                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold">Color:</h3>
                        <span className="text-gray-700 ml-2">{furnitureItem.attributes.color}</span>
                    </div>

                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold">Dimensions:</h3>
                        <span className="text-gray-700 ml-2">{furnitureItem.attributes.dimensions}</span>
                    </div>

                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold">Location:</h3>
                        <span className="text-gray-700 ml-2">{furnitureItem.location}</span>
                    </div>

                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold">Price per day:</h3>
                        <span className="text-blue-500 font-bold text-xl ml-2">₹{furnitureItem.rentalPrice.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="days" className="text-lg font-semibold mr-2">Number of days:</label>
                        <input
                            type="number"
                            id="days"
                            value={days}
                            onChange={(e) => setDays(parseInt(e.target.value, 10))}
                            min="1"
                            className="border rounded p-1 w-20"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold">Total Price :</h3>
                        <span className="text-blue-500 font-bold text-xl ml-2">₹{(furnitureItem.rentalPrice * days).toLocaleString()}</span>
                    </div>

                    <div className='mt-4'>
                        <Link to={`/Card/${furnitureItem.id}`}>
                            <button
                                onClick={handleAddToCart}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2">
                                Add to Cart
                            </button>
                        </Link>
                        <button
                            onClick={handleBookNow}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Book Now
                        </button>
                    </div>

                    {clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FurnitureDetails;
