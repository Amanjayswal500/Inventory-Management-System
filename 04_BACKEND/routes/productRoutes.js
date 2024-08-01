const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authMiddleware, authMiddlewareAdmin } = require("../middleware/auth");

// You had two identical imports, I removed the duplicate
// const verifyToken = require("../middleware/auth"); // Removed

// Added Protected routes
router.get("/getAllProducts", authMiddleware, productController.getAllProducts);
router.get(
  "/GetProducts/:id",
  authMiddleware,
  productController.getProductById
);
router.post(
  "/createProduct",
  authMiddlewareAdmin,
  productController.createProduct
);
router.put(
  "/updateProduct/:id",
  authMiddlewareAdmin,
  productController.updateProduct
);
router.delete(
  "/deleteProducts/:id",
  authMiddlewareAdmin,
  productController.deleteProduct
);
router.get("/searchProduct", authMiddleware, productController.searchProduct);

module.exports = router;
