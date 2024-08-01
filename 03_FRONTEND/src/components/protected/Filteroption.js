import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utilities/apputils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const FilterComponent = ({ getCategory }) => {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState({
    price: "",
    category: "",
    availablity: ""
  });

  const role = JSON.parse(localStorage.getItem("user")).role;
  const admin = role ? false : true;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchData("get", `category/getallcategory`);
        setCategories(response.data);
      } catch (error) {
        // Handle errors if any
      }
    };
    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFilterOptionChange = (fieldName, event) => {
    const value = event.target.value;
    let updatedFilter = { ...selectedFilterOption, [fieldName]: value === "all" ? "" : value };
    if (fieldName === "category") {
      const categoryName = categories.find(category => category._id === value)?.categoryName || "";
      updatedFilter = { ...updatedFilter, categoryName };
    }
    setSelectedFilterOption(updatedFilter);
  };

  useEffect(() => {
    getCategory(selectedFilterOption);
  }, [selectedFilterOption]);

  return (
    <div>
      <button className="filter-button" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faFilter} /> Filter
      </button>
      {showDropdown && (
        <div className="filter">
          <label>Select Price</label>
          <select
            value={selectedFilterOption.price}
            onChange={(event) => handleFilterOptionChange("price", event)}
          >
            <option value="all">All Prices</option>
            <option value={500}>Less than 500</option>
            <option value={1000}>Less than 1000</option>
            <option value={10000}>Less than 10000</option>
            <option value={50000}>Less than 50000</option>
            <option value={100000}>Less than 100000</option>
          </select>
          <label>Select Category</label>
          <select
            value={selectedFilterOption.category}
            onChange={(event) => handleFilterOptionChange("category", event)}
          >
            <option value="all">All Categories</option>
            {categories?.map((item) => (
              <option key={item._id} value={item._id}>{item.categoryName}</option>
            ))}
          </select>
          {!admin && (
            <>
              <label>Select Availability</label>
              <select
                value={selectedFilterOption.availablity}
                onChange={(event) => handleFilterOptionChange("availablity", event)}
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
