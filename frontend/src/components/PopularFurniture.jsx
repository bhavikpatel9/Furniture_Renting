import React from "react";
import { Link } from "react-router-dom";

const PopularFurniture = ({ popularFurniture }) => {
  return (
    <>
    <h1 className="mt-4 ml-4 font-bold text-2xl">Popular Furnitures</h1>
    <div className="container mx-auto mt-4 p-4">
      {popularFurniture.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularFurniture.map((item) => (
            <div
              key={item.id}
              className="bg-white border shadow-md p-4 rounded-lg hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full border-2 h-40 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <span className={`mt-4 rounded py-1 text-white ${item.availabilityStatus === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{item.availabilityStatus}</span>
              <div className="flex justify-between items-center">
                <span className="text-blue-500">₹{item.rentalPrice} / Day</span>
                <Link to={`/furnitureDetails/${item.id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-center text-gray-500 mt-8">
          No furniture items available.
        </p>
      )}
    </div>
    {/* button for view all furniture */}
    <div className="text-center">
        <Link to="/allfurniture">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 m-2"
          >
            View All Furniture
          </button>
        </Link>
      </div>
    </>
  );
};

export default PopularFurniture;
