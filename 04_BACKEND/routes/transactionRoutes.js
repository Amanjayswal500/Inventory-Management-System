const express = require("express");
const router = express.Router();
const {
  createTransaction,
  handleGetAlltransaction,
  handlegetTransactionByID,
  handleUpdatesTransactions,
  handleDeleteTransaction,
} = require("../controllers/transactionController");

// 1. Create a Transaction (POST)
router.post("/createTransaction", createTransaction);

// 2. Retrieve All Transactions (GET)
router.get("/listTransaction", handleGetAlltransaction);

// 3. Retrieve a Specific Transaction by ID (GET)
router.get("/getTransaction/:id", handlegetTransactionByID);

// 4. Update a Transaction by ID (PUT)
router.put("/updateTransaction/:id", handleUpdatesTransactions);

// 5. Delete a Transaction by ID (DELETE)
router.delete("/deleteTransaction/:id", handleDeleteTransaction);

module.exports = router;
