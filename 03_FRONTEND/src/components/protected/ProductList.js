import React, { useState,useEffect } from "react";

import { Link } from "react-router-dom";
// import { fetchData } from "../../utilities/apputils";
import Footer from "./Footer";

const ProductList = ({ products, error, loading }) => {
  //pagination state and functionality
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState(products);
  const [pageNumbers, setPageNumbers] = useState([]);


  useEffect(() => {
    const itemsPerPage = 10; // Number of items to display per page
    let indexOfLastItem = 0;

    setCurrentPage(1);
    indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem));
    const arr = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
      arr.push(i);
    }
    setPageNumbers([...arr])
  }, [products]);

  useEffect(() => {
    const itemsPerPage = 10; // Number of items to display per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem));


    const arr = [];

    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
      arr.push(i);
    }
    setPageNumbers([...arr])
  }, [currentPage]);


  const capitalizeFirstLetter = (text = "abc") => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  if (loading) {
    return <div> loading...</div>;
  }
  if (error) {
    return <div>Error :{error}</div>;
  }

  if(products.length ===0){
    return<div>No Products Found</div>
  }

  return (
    <>
      <div className="page-wrapper" >
        {/* <ManageProduct /> */}
        <div className="product-container">
          {currentItems?.map((item) => (
            <div className="item-container" key={item._id}>
              <Link to={`/product/${item._id}`}>
                <img
                  className="item-image"
                  src={item.imageUrl}
                  alt="displayed item"
                />
                <div className="details-container">
                  <div className="company-name">{item.name}</div>
                  <div className="item-name">{item.description}</div>
                  {/* Added categories  */}
                  <div className="category">
                    {capitalizeFirstLetter(item.categoryId?.categoryName)}
                  </div>
                  <div className="price">
                    <span className="current-price">Rs {item.price}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <ul className="pagination">
          <li className={currentPage === 1 ? "disabled" : ""}>
            <button
              className="arrow"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Back
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={currentPage === number ? "active" : ""}>
              <button onClick={() => setCurrentPage(number)}>{number}</button>
            </li>
          ))}
          <li className={currentPage === pageNumbers.length ? "disabled" : ""}>
            <button
              // className="arrow"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
      <div className="dash-footer">
        <Footer />
      </div>
    </>
  );
  };

export default ProductList;
