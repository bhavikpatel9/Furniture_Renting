import React from 'react';
import { useParams } from 'react-router-dom';

const Cart = ({ allFurniture }) => {
    const { id } = useParams();
    const furnitureItem = allFurniture.find(item => item.id.toString() === id);

    if (!furnitureItem) {
        return <div>Furniture not found</div>;
    }

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

                <div className='mt-4'>
                    {/* Add any additional functionality or UI elements for the card view */}
                </div>
            </div>
        </div>
    );
};

export default Cart;
