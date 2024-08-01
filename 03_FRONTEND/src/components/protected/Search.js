import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "../../index.css";
import ProductList from "./ProductList";
import { fetchData } from "../../utilities/apputils";
import Filteroption from "./Filteroption";
// Search component
const Search = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [originalSearchResult, setOriginalSearchResult] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchSuggest, setSearchSuggest] = useState([]);
  const [saveCategoryId, setSaveCategoryId] = useState(false);
  const [prevFilterOption, setPrevFilterOption] = useState({
    "price": "",
    "category": "",
    "Category": "",
    "availablity": ""
  });
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showResults, setShowResults] = useState(false);
  //product state
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleRow, setVisibleRow] = useState(null);
  const handleButtonClick = (id) => {
    setVisibleRow(visibleRow === id ? null : id);
};
  // Function to fetch products for dashboard products
  const fetchProducts = async () => {
    try {
      const response = await fetchData("get", "product/getAllProducts");
      if (response !== null) {
        setProducts(response.data.products);
        setOriginalProducts(response.data.products);
        setLoadingProduct(false);
      } else {
        setError("UnAuthorized");
        setLoadingProduct(false);
      }
    } catch (error) {
      setError(error.message);
      setLoadingProduct(false);
    }
  };
  // useEffect hook to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);
  // Function to toggle sort order
  const toggleSortOrder = (field) => {
    if (field === sortField) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  // Function to handle key press event
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Function to handle search functionality
  const handleSearch = async (query = searchQuery) => {
    if (query.trim() !== "") {
      try {
        setLoading(true);
        const response = await fetchData(
          "get",
          `product/searchProduct?name=${query}&sortField=${sortField}&sortOrder=${sortOrder}`
        );

        setOriginalSearchResult(response.data);
        setShowResults(true);
        setSearchResults(response.data);

        // Update recent searches
        setRecentSearches((prevRecentSearches) => {
          const updatedRecentSearches = [query, ...prevRecentSearches.filter(q => q !== query)];
          return updatedRecentSearches.slice(0, 5); // Keep only the last 5 searches
        });
      } catch (error) {
        let response = error.response;
        setShowResults(false);
        if (response) {
          if (response?.status === 404) {
          }
        }
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
      setOriginalSearchResult([])
      setShowResults(false);
    }
  };
  
  // Function to handle input change in search bar
  const handleChange = (e) => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setSearchSuggest(filteredProducts.slice(0, 6))
    setSearchQuery(e.target.value);
  };
  
  // Function to filter products based on selected category and other criteria
  const getCategory = (filterCriteria) => {
    let filteredProducts;
    setSaveCategoryId(true);
    setPrevFilterOption(filterCriteria)
    // filter for  serach
    if (showResults) {
      filteredProducts = originalSearchResult?.filter(product => filterCriteria?.category === "" ? true : (product?.categoryId === filterCriteria?.category));
      filteredProducts = filteredProducts?.filter(product => filterCriteria?.availablity === "" ? true : (product?.status === filterCriteria?.availablity));
      filteredProducts = filteredProducts?.filter(product => filterCriteria?.price === "" ? true : (product?.price <= Number(filterCriteria?.price)));
      setSearchResults(filteredProducts);
      setShowResults(true);
    } else {
      // Apply filter for dashboard products
      filteredProducts = originalProducts?.filter(product => filterCriteria?.category === "" ? true : (product?.categoryId?._id === filterCriteria.category));
      filteredProducts = filteredProducts?.filter(product => filterCriteria?.availablity === "" ? true : (product?.status === filterCriteria.availablity));
      filteredProducts = filteredProducts?.filter(product => filterCriteria?.price === "" ? true : (product?.price <= Number(filterCriteria.price)));
      setProducts(filteredProducts);
      setShowResults(false);
    }
  }
  
  // Function to render badges for selected filters
  const renderBadges = () => {
    return Object.keys(prevFilterOption).map((key) => {
        const value = prevFilterOption[key];
        if (value && key !== "category") { // Check if the value is not empty
            return (
                <span key={key} style={{ display: 'inline-block', padding: '5px 10px', margin: '5px', backgroundColor: '#007bff', color: 'white', borderRadius: '12px' }}>
                    {key}: {value}
                </span>
            );
        }
        return null;
    });
};

// Function to handle focus event on search input
const handleSearchFocus = () => {
  setIsSearchFocused(true);
};

// Function to handle blur event on search input
const handleSearchBlur = () => {
  setIsSearchFocused(false);
};
  return (
    <>
      <div className="searchpage-container">
        <div className="search-block">
          <div style={{ display: "flex", position: "fixed", top: "10px" }}>
            <div style={{ width: "60vw" }}>
              <div className="search-bar" style={{ position: "relative" }}>
                <input
                  type="text"
                  id="search-input"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={handleChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={()=>handleSearch()} className="material-icons-sharp">
                  search
                </button>
                {isSearchFocused && (
                  <div style={{ position: "absolute", top: "3rem", width:"100%", padding: "1rem" , background:"white" }}>
                    {searchSuggest.length > 0 ? (
                      searchSuggest.map(product => (
                        <div key={product._id}>
                          <p>{product.name}</p>
                        </div>
                      ))
                        ) : (
                          <p>No matching products found.</p>
                          )}
                      </div>
                    )}
              </div>
            </div>

           {/* Filter option component */}
            <div style={{ marginTop: "10px" }}>
              <Filteroption getCategory={getCategory} />
            </div>
          </div>
          <div>
            {renderBadges()}
          </div>
          {loading && <p>Loading...</p>}
          {showResults && (searchResults?.length > 0) && (
            <>
            <span>{searchResults.length} Result found.</span>
            <table className="table-container">
              <thead>

                <tr className="table-head">
                  <th>Product</th>
                  <th onClick={() => toggleSortOrder("name")}>
                    Product Name
                    {sortField === "name" && (
                      <FontAwesomeIcon
                        icon={sortOrder === "asc" ? faArrowUp : faArrowDown}
                      />
                    )}
                  </th>
                  <th onClick={() => toggleSortOrder("price")}>
                    Price
                    {sortField === "price" && (
                      <FontAwesomeIcon
                        icon={sortOrder === "asc" ? faArrowUp : faArrowDown}
                      />
                    )}
                  </th>
                  <th onClick={() => toggleSortOrder("quantity")}>
                    Quantity
                    {sortField === "quantity" && (
                      <FontAwesomeIcon
                        icon={sortOrder === "asc" ? faArrowUp : faArrowDown}
                      />
                    )}
                  </th>
                  <th onClick={() => toggleSortOrder("status")}>
                    Status
                    {sortField === "status" && (
                      <FontAwesomeIcon
                        icon={sortOrder === "asc" ? faArrowUp : faArrowDown}
                      />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults
                  .sort((a, b) => {
                    if (sortField === "status") {
                      const statusOrder = { available: 1, out_of_stock: 2 };
                      return sortOrder === "asc"
                        ? statusOrder[a[sortField]] - statusOrder[b[sortField]]
                        : statusOrder[b[sortField]] - statusOrder[a[sortField]];
                    } else if (
                      sortField === "price" ||
                      sortField === "quantity"
                    ) {
                      return sortOrder === "asc"
                        ? a[sortField] - b[sortField]
                        : b[sortField] - a[sortField];
                    } else {
                      const valueA =
                        typeof a[sortField] === "string"
                          ? a[sortField].toLowerCase()
                          : a[sortField];
                      const valueB =
                        typeof b[sortField] === "string"
                          ? b[sortField].toLowerCase()
                          : b[sortField];
                      if (
                        typeof valueA === "string" &&
                        typeof valueB === "string"
                      ) {
                        return sortOrder === "asc"
                          ? valueA.localeCompare(valueB)
                          : valueB.localeCompare(valueA);
                      } else {
                        return 0;
                      }
                    }
                  })
                  .map((product, index) => (
                    <React.Fragment key={index}>

                    <tr onClick={() => handleButtonClick(index)} key={index}  className="trows">

                      <td>
                        <Link to={`/product/${product._id}`}>
                          <img
                            src={product.imageUrl}
                            alt="Product"
                            style={{ width: "200px", height: "200px" }}
                          />
                        </Link>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.status}</td>

                    </tr>
                    {visibleRow === index && (
                      <tr>
                        <td colSpan="5">
                          <p>{product.description}</p>
                        </td>
                      </tr>
                      )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
            </>
          )}
          {showResults && searchResults.length === 0 && (
            <table className="table-container">
              <th>No such product found.</th>
            </table>
          )}
          {!showResults && <ProductList products={products} error={error} loading={loadingProduct} />}
        </div>
      </div>
    </>
  );
}
export default Search;
