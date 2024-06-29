import React, { useState, useEffect } from "react";
import Home from "../components/Home";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const AllFurniture = ({ allFurniture }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([99, 999]);
  const [filteredFurniture, setFilteredFurniture] = useState(allFurniture);
  const [sortOrder, setSortOrder] = useState("lowest");

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  useEffect(() => {
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];

    let filtered = allFurniture.filter((item) => {
      const price = item.rentalPrice;
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return (
        matchesCategory &&
        price >= minPrice &&
        price <= maxPrice &&
        item.name.toLowerCase().includes(searchQuery)
      );
    });

    if (sortOrder === "lowest") {
      filtered = filtered.sort((a, b) => a.rentalPrice - b.rentalPrice);
    } else if (sortOrder === "highest") {
      filtered = filtered.sort((a, b) => b.rentalPrice - a.rentalPrice);
    }

    setFilteredFurniture(filtered);
  }, [priceRange, selectedCategory, searchQuery, sortOrder]);

  return (
    <>
      <Home imageHeight="h-[100px]" searchedQuery={searchQuery} />

      <div className="mt-4 mx-4 flex justify-between">
        <div>
          <button
            className={`${
              selectedCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-4 py-2 mr-2 rounded-md`}
            onClick={() => {
              handleChangeCategory("all");
            }}
          >
            All
          </button>
          <button
            className={`${
              selectedCategory === "Living Room"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-4 py-2 mr-2 rounded-md`}
            onClick={() => {
              handleChangeCategory("Living Room");
            }}
          >
            Living Room
          </button>
          <button
            className={`${
              selectedCategory === "Dining Room"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-4 py-2 mr-2 rounded-md`}
            onClick={() => {
              handleChangeCategory("Dining Room");
            }}
          >
            Dining Room
          </button>
          <button
            className={`${
              selectedCategory === "Office"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-4 py-2 mr-2 rounded-md`}
            onClick={() => {
              handleChangeCategory("Office");
            }}
          >
            Office
          </button>
          <button
            className={`${
              selectedCategory === "Bedroom"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-4 py-2 mr-2 rounded-md`}
            onClick={() => {
              handleChangeCategory("Bedroom");
            }}
          >
            Bedroom
          </button>
        </div>
      </div>

      <div className="mt-4 mx-4">
        <h2>Filter by Price</h2>
        <div style={{ width: "80%", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
          <Slider
            range
            min={99}
            max={999}
            defaultValue={[99, 999]}
            onChange={handleSliderChange}
            trackStyle={[{ backgroundColor: "#4299e1" }]}
            handleStyle={[
              { borderColor: "#4299e1" },
              { borderColor: "#4299e1" },
            ]}
          />
        </div>
      </div>

      <div className="mt-4 mx-4">
        <h2>Sort by Price</h2>
        <div className="flex gap-5">
          <label>
            <input
              type="radio"
              value="lowest"
              checked={sortOrder === "lowest"}
              onChange={() => setSortOrder("lowest")}
              className="mr-1"
            />
            Lowest Price First
          </label>
          <label>
            <input
              type="radio"
              value="highest"
              checked={sortOrder === "highest"}
              onChange={() => setSortOrder("highest")}
              className="mr-1"
            />
            Highest Price First
          </label>
        </div>
      </div>

      <div className="container mx-auto mt-4 p-4">
        {filteredFurniture.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFurniture.map((item, index) => (
              <div
                key={index}
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
                  <span className="text-blue-500">₹{item.rentalPrice}</span>
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
            No furniture items found matching your search.
          </p>
        )}
      </div>
    </>
  );
};

export default AllFurniture;
