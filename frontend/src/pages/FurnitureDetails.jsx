import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
        let total = furnitureItem.rentalPrice * numRenters;
        return total;
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
                    <span className={`mt-4 rounded py-1 text-white ${furnitureItem.availabilityStatus === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{furnitureItem.availabilityStatus}</span>

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

                </div>
            </div>
                    <div className='flex justify-center mt-4'>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">Add to Cart</button>
                    </div>
        </div>
    );
};

export default FurnitureDetails;
