const express = require('express');
const Checkout = require('../model/checkout');
const Product = require('../model/productModel');
const { isValidObjectId } = require("mongoose");

class checkoutController {
  // Create Checkout
  static async addCheckout(req, res) {
    try {
        // Destructure user_id and cart from the request body
        const { user_id, cart } = req.body;

        // Parse the cart string into an array
        const carts = JSON.parse(cart);

        let session = false;

        // Validate user_id format
        if (!isValidObjectId(user_id)) {
            return res.status(403).json({ errors: "Invalid User ID" });
        }

        // Validate required fields
        if (!user_id || !cart) {
            return res.status(403).json({ errors: "All fields are required" });
        }

        // Check product quantities and create checkout records
        for (const product of carts) {
            const dbProduct = await Product.findById(product.product._id);
            // Check if product exists and has sufficient quantity
            if (!dbProduct || dbProduct.quantity < product.quantity) {
                return res.status(404).json({ errors: `Product ${product.product.name} has insufficient quantity` });
            }
            try {
                // Create checkout record
                await Checkout.create({
                    user_id: user_id,
                    product: product.product._id,
                    quantity: product.quantity,
                    price: (product.product.price * product.quantity)
                });

                // Update product quantity
                await Product.findByIdAndUpdate(product.product._id, {
                    $inc: { quantity: -product.quantity }
                });

                session = true;
            } catch (error) {
                console.log(error);
                session = false;
            }
        }

        // Return appropriate response based on session status
        if (session) {
            return res.status(201).json({ message: "Checkout done successfully" });
        }
        return res.status(500).json({ errors: 'Server error' });
    } catch (error) {
        // Return a 500 error if an unexpected error occurs
        return res.status(500).json({ errors: 'Internal Server Error' });
    }
}


  // Get all Checkouts
  static async getCheckouts(req, res) {
    try {
        // Fetch all checkouts from the database and populate the 'product' and 'user_id' fields
        const checkouts = await Checkout.find().populate('product').populate('user_id');

        // If no checkouts are found, return a 404 error
        if (checkouts.length === 0) {
            return res.status(404).json({ errors: 'No checkouts found' });
        }

        // Return the list of checkouts with a 201 status code
        return res.status(201).json(checkouts);
    } catch (error) {
        // If an error occurs during the operation, log the error and return a 500 status code
        console.error(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


  // Get checkout by User ID
  static async getCheckoutByUserId(req, res) {
    try {
      const userId = req.params.user_id;

      if (!userId) {
        return res.status(400).json({ errors: 'User ID is required' });
      }

      const checkout = await Checkout.find({ user_id: userId }).populate('product').populate('user_id');


      if (!checkout) {
        return res.status(404).json({ errors: 'Checkout not found' });
      }

      return res.status(201).json(checkout);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: 'Server error' });
    }
  }

  // Get checkout by ID
  static async getCheckoutById(req, res) {
    try {
      const checkoutId = req.params.id;

      if (!isValidObjectId(checkoutId)) {
        return res.status(400).json({ errors: 'Invalid checkout ID' });
      }

      const checkout = await Checkout.findById(checkoutId).populate('products._id');

      if (!checkout) {
        return res.status(404).json({ msg: 'Checkout not found' });
      }

      res.json(checkout);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // Update checkout by ID
  static async updateCheckout(req, res) {
    try {
      const checkoutId = req.params.id;
      const { payment_method, shipping_address } = req.body;

      if (!payment_method && !shipping_address) {
        return res.status(400).json({ errors: 'Please provide payment_method or shipping_address to update' });
      }

      const updatedCheckout = await Checkout.findByIdAndUpdate(
        checkoutId,
        { payment_method, shipping_address },
        { new: true }
      );

      if (!updatedCheckout) {
        return res.status(404).json({ errors: 'Checkout not found' });
      }

      res.json(updatedCheckout);
    } catch (error) {
      console.error(error.message);
      if (error.name === 'CastError') {
        return res.status(400).json({ errors: 'Invalid checkout ID' });
      }
      res.status(500).json({ errors: 'Server error' });
    }
  }

  // Delete checkout by ID
  static async deleteCheckout(req, res) {
    try {
      const checkoutId = req.params.id;

      if (!isValidObjectId(checkoutId)) {
        return res.status(400).json({ errors: 'Invalid checkout ID' });
      }

      const deletedCheckout = await Checkout.findByIdAndDelete(checkoutId);

      if (!deletedCheckout) {
        return res.status(404).json({ msg: 'Checkout not found' });
      }

      res.json({ msg: 'Checkout deleted successfully' });
    } catch (error) {
      console.error(error.message);
      if (error.name === 'CastError') {
        return res.status(400).json({ msg: 'Invalid checkout ID' });
      }
      res.status(500).json({ msg: 'Server error' });
    }
  }
}

module.exports = checkoutController;
