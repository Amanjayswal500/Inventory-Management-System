const Transaction = require("../model/transactionModel");
const mongoose = require("mongoose");

// Function to create a new transaction
async function createTransaction(req, res) {
  try {
    const newTransaction = new Transaction(req.body);
    // Validate the new transaction against the schema
    const validationResult = newTransaction.validateSync();
    if (validationResult) {
      // Extract and format validation errors
      const errors = Object.values(validationResult.errors).map(
        (error) => error.message
      );
      return res
        .status(400)
        .json({ message: "Invalid transaction data", errors });
    }
    // Save the new transaction to the database
    await newTransaction.save();
    // Return success response with the created transaction
    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Function to get all transactions based on optional filters
async function handleGetAlltransaction(req, res) {
  const filters = {};
  const { userId, checkoutId, startDate, endDate } = req.query;

  // Apply filters based on query parameters
  if (userId) filters.userId = userId;
  if (checkoutId) filters.checkoutId = checkoutId;
  if (startDate && endDate) filters.date = { $gte: startDate, $lte: endDate };
  else if (startDate) filters.date = { $gte: startDate };
  else if (endDate) filters.date = { $lte: endDate };

  // Find transactions based on filters
  Transaction.find(filters)
    .then((transactions) => res.status(200).json({ transactions }))
    .catch((err) => res.status(500).json({ message: "Server error" }));
}

// Function to get a transaction by user ID
async function handlegetTransactionByID(req, res) {
  try {
    //  const transaction = await Transaction.findById(req.params.id)
    // Find transaction(s) by user ID and populate related fields
    const transaction = await Transaction.find({ userId: req.params.id })
      .populate("userId")
      .populate("checkoutId")
      .populate("items.itemId");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ transaction });
  } catch (err) {
    // Log and return server error
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Function to update a transaction
async function handleUpdatesTransactions(req, res) {
  try {
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

   // Convert itemId strings to ObjectIds in the request body
    req.body.items = req.body.items.map((item) => ({
      ...item,
      itemId: new mongoose.Types.ObjectId(item.itemId),
    }));
    // Find and update the transaction by ID
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        maxTimeMS: 500000,
      }
    );

    // Check if the transaction was found and updated
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    // Return the updated transaction
    res.status(200).json({ transaction: updatedTransaction });
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ message: "Invalid transaction data", error: err.message });
  }
}

// Function to delete a transaction
async function handleDeleteTransaction(req, res) {
  try {
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    // Find and delete the transaction by ID
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    // Check if the transaction was found and deleted
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    // Return success message
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  createTransaction,
  handleGetAlltransaction,
  handlegetTransactionByID,
  handleUpdatesTransactions,
  handleDeleteTransaction,
};
