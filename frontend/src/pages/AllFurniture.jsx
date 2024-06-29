import React, { useState, useEffect } from "react";
import Home from "../components/Home";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaSun, FaMoon } from "react-icons/fa";

const AllFurniture = ({allFurniture}) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([15, 75]);
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

  const currencyRates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0094,
  };

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const [selectedCurrency, setSelectedCurrency] = useState("INR");

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const convertPrice = (price, currency) => {
    const rate = currencyRates[currency];
    return `${currencySymbols[currency]} ${Math.floor(
      price * rate
    ).toLocaleString()}`;
  };

  const convertRange = (range, currency) => {
    const rate = currencyRates[currency];
    return range.map((value) => Math.floor(value * rate));
  };

  const convertedRange = convertRange(priceRange, selectedCurrency);

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
        <div>
          <select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            className="border-gray-500 border rounded"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>

      <div className="mt-4 mx-4">
        <h2>Filter by Price</h2>
        <div style={{ width: "80%", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              {currencySymbols[selectedCurrency]}{" "}
              {convertedRange[0].toLocaleString()}
            </span>
            <span>
              {currencySymbols[selectedCurrency]}{" "}
              {convertedRange[1].toLocaleString()}
            </span>
          </div>
          <Slider
            range
            min={15}
            max={75}
            defaultValue={[15, 75]}
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

      <div className="container mx-auto mt-4">
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
                <p className="text-gray-600">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-500">
                    {convertPrice(item.rentalPrice, selectedCurrency)}
                  </span>
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
