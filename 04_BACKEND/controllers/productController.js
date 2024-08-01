const Product = require("../model/productModel");
const axios = require("axios");
const {
  validateProductName,
  validateDescription,
  validatePrice,
  validateQuantity,
  validateCategoryId,
} = require("../services/validationService");
const { isValidObjectId } = require("mongoose");

/**
 * Controller function for Getting all product
 * @param {*} req
 * @param {*} res
 * @returns products json
 */
async function getAllProducts(req, res) {
  try {
    
    const products = await Product.find().populate(
      "categoryId",
      "categoryName"
    ).sort({ updatedAt: -1 });

    // Check if no products were found
    if (products.length === 0) {
      return res.status(404).json({ errors: "No products found" });
    }

    // Respond with the products in a JSON format
    return res.json({ products });
  } catch (err) {
    // Handle any errors that occur during the aggregation
    return res.status(500).json({ errors: err.message });
  }
}

/**
 * Controller function for Getting product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>}
 */
async function getProductById(req, res) {
  try {
    // Validate if the request parameter 'id' is a valid MongoDB ObjectId
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ errors: "Invalid product ID" });
    }

    // Find a product by its ID
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      "categoryName"
    );

    // Check if the product exists
    if (!product || product.length === 0) {
      // If the product does not exist, respond with a 404 error
      return res.status(404).json({ errors: "Product not found" });
    }

    // If the product exists, respond with the product in JSON format
    return res.json(product);
  } catch (err) {
    // Handle any errors that occur during the database query
    return res.status(500).json({ errors: err.message });
  }
}

/**
 * Controller function for Create a new product
 * @param {Object} productData - Data for the new product
 * @returns {Promise<Object>}
 */
async function createProduct(req, res) {
  // Destructure the request body to extract the required fields
  const { name, description, price, quantity, status, categoryId, imageUrl } =
    req.body;

  // console.log("new product request body ----", req);

  try {
    // Validate the request body fields
    const validationResponses = {
      nameResponse: validateProductName(name),
      descriptionResponse: validateDescription(description),
      priceResponse: validatePrice(price),
      quantityResponse: validateQuantity(quantity),
      // statusResponse: validateStatus(status),
      categoryIdResponse: validateCategoryId(categoryId),
      // imageUrlResponse: validateImageUrl(imageUrl),
    };

    // Check each validation response
    let returnMessage = "";
    let isValidationFail = false;
    for (const key in validationResponses) {
      let value = validationResponses[key];
      if (value !== null) {
        // Add the validation failure message to the final return message if found
        returnMessage += value.message + " ";
        isValidationFail = true;
      }
    }

    if (isValidationFail) {
      // Return a 422 status code when validation failure occurs
      return res.status(422).json({ errors: returnMessage });
    }
    // finds duplicate products

    const duplicateProduct = await Product.findOne({ name: name });
    if (duplicateProduct) {
      return res
        .status(403)
        .json({ errors: "Product with this name already exists" });
    }

    // Create a new product instance using the extracted fields
    const product = new Product({
      name,
      description,
      price,
      quantity,
      status,
      categoryId,
      imageUrl,
    });
    // Save the new product to the database
    const newProduct = await product.save();
    // Return the newly created product as a JSON response with status code 201 (Created)
    return res.status(201).json(newProduct);
  } catch (err) {
    // For other errors, return a generic error message
    return res.status(400).json({ errors: err.message });
  }
}

/**
 * Controller function for Update product by ID
 * @param {string} id - Product ID
 * @param {Object} newData
 * @returns {Promise<Object>}
 */
async function updateProduct(req, res) {
  try {
    // Update the product with the provided ID using the request body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // Check if the product was updated successfully
    if (updatedProduct) {
      // Respond with the updated product in JSON format
      res.json(updatedProduct);
    } else {
      // If the product does not exist, respond with a 404 error
      res.status(404).json({ errors: "Product not found" });
    }
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
}

/**
 * Controller function for Delete product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>}
 */
async function deleteProduct(req, res) {
  try {
    // Validate if the request parameter 'id' is a valid MongoDB ObjectId
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ errors: "Invalid product ID" });
    }

    // Attempt to find and delete the product by its ID
    await Product.findByIdAndDelete(req.params.id);

    // Respond with a success message if the deletion was successful
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
}

/**
 * Controller function for Retrieving products by category name
 * @param {*} req
 * @param {*} res
 * @returns products json
 */
async function getProductsByCategory(req, res) {
  try {
    const { categoryName } = req.query;
    if (!categoryName) {
      return res.status(400).json({ errors: "Category name is required" });
    }

    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: {
          "category.categoryName": categoryName,
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          quantity: 1,
          status: 1,
          category: "$category.categoryName",
          imageUrl: 1,
          createdAt: { $ifNull: ["$createdAt", null] },
          updatedAt: { $ifNull: ["$updatedAt", null] },
        },
      },
    ]);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ errors: "No products found for this category" });
    }

    return res.json({ products });
  } catch (err) {
    return res.status(500).json({ errors: err.message });
  }
}


/**
 * Controller function for searching  products
 * @param {Object} productData - Data for the new product
 * @returns {Promise<Object>}
 */

async function searchProduct(req, res) {
  try {
    // Destructure the name parameter from the query string
    let { name } = req.query;

    // Check if name is provided
    if (!name) {
      return res.status(401).json({ message: "Product name is required." });
    }

    // Trim the name to remove any leading or trailing spaces
    name = name.trim();

    // Validate the name parameter to ensure it's not empty after trimming
    if (name === "") {
      return res.status(402).json({ message: "Product name cannot be empty." });
    }

    // Search for products whose names match the provided name (case-insensitive)
    const products = await Product.find({
      name: { $regex: new RegExp(name, "i") },
    });

    // Check if products were found
    if (products.length === 0) {
     
         // If the product does not exist, respond with a 404 error
         return res.status(404).json({ errors: "Product not found" });
     
    }
     // Return the found products
     return  res.status(201).json(products);
  } catch (err) {
    // Return a 500 status code for any server errors
    return res.status(500).json({ errors: "Internal Server Error"  });
  }
}


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProductsByCategory,
};
