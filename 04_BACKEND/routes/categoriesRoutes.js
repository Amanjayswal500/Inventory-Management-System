const CategoryController = require("../controllers/CategoryController.js");
const Router = require("express");
const {
  authMiddlewareAdmin,
  authMiddleware,
} = require("../middleware/auth.js");
const router = Router();

// Add categories
router.post(
  "/addcategory",
  authMiddlewareAdmin,
  CategoryController.addCategory
);
// Get all categories
router.get("/getallcategory", authMiddleware, CategoryController.allCategories);
// Get category by id
router.get("/getcategory/:id", authMiddleware, CategoryController.getCategory);
// Update category
router.put(
  "/updatecategory/:id",
  authMiddlewareAdmin,
  CategoryController.updateCategory
);
// Delete category
router.delete(
  "/deletecategory/:id",
  authMiddlewareAdmin,
  CategoryController.deleteCategory
);
//get category by name
router.get(
  "/getCategoryByName",
  authMiddleware,
  CategoryController.getCategoryByName
);

module.exports = router;
