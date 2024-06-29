import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FurnitureDetails = ({ allFurniture, isLoggedIn }) => {
    const { id } = useParams();
    const furnitureItem = allFurniture.find(item => item.id === id);

    if (!furnitureItem) {
        return <div>Furniture not found</div>;
    }

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const [showContactDetails, setShowContactDetails] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [numRenters, setNumRenters] = useState(1);

    const contactDetailsRef = useRef(null);

    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (isLoggedIn) {
            setShowContactDetails(true);
            setTimeout(() => {
                contactDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                contactDetailsRef.current.focus();
            }, [0]);
        } else {
            navigate('/signup');
        }
    };

    const calculateTotalPrice = () => {
        let total = (furnitureItem.pricePerDay || 0) * numRenters;
        return total;
    };

    return (
        <div className="container mx-auto mt-8 p-2">
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mb-8 w-1/2">
                <img src={furnitureItem.imageUrl} alt={furnitureItem.name} className="w-full h-full object-cover rounded-md" />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">{furnitureItem.name}</h2>
                <p className="text-gray-600 mb-4">{furnitureItem.description}</p>
                <p className="text-gray-600 mb-4">{furnitureItem.availabilityStatus}</p>

                <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold">Price per day :</h3>
                    <span className="text-blue-500 font-bold text-xl ml-2">₹{(furnitureItem.rentalPrice || 0).toLocaleString()}</span>
                </div>

                <div className='text-center mt-4'>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Add to Cart</button>
                    <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Buy</button>
                </div>

                {showContactDetails && (
                    <div ref={contactDetailsRef} className="mt-8 mx-auto w-2/3 p-4 border rounded-md">
                        <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                                <input type="text" id="firstName" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                                <input type="text" id="lastName" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile number</label>
                                <input type="text" id="mobile" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    rows="4"
                                    placeholder="Enter your address here"
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Date of Rent</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={date => setSelectedDate(date)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="numRenters" className="block text-sm font-medium text-gray-700">Number of Renters</label>
                            <input
                                type="number"
                                id="numRenters"
                                value={numRenters}
                                onChange={e => setNumRenters(e.target.value)}
                                min="1"
                                max="10"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className='mt-4 font-bold'>Final Price ({numRenters} renter(s)): ₹{(numRenters * calculateTotalPrice()).toLocaleString()}</div>

                        <button className='bg-blue-500 px-4 py-2 mt-2 rounded text-white hover:bg-blue-700'>Proceed to Pay</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FurnitureDetails;
