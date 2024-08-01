import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//function Used by Unprotected Routes
const fetchDataUnprotected = async (method, endpoint, body) => {
  try {
    const response = await axios[method](`${BACKEND_URL}/${endpoint}`, body);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// function Used by Protected Routes
const fetchData = async (method, endpoint, body) => {
  const token = localStorage.getItem("token");

  try {
    // const response = await axios[method](`${BACKEND_URL}/${endpoint}`, body, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    let response;
    if (method === "get" || method === "delete") {
      // For GET and DELETE,
      response = await axios[method](`${BACKEND_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // For POST, PUT, PATCH, 'body' should be passed as the second argument
      response = await axios[method](`${BACKEND_URL}/${endpoint}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchDataUnprotected, fetchData };
