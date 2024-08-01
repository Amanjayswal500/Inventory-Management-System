// dependencies
const Category = require("../model/categories.js");

/** Class containing all the controllers (as methods) for the /category path
 */
class CategoryController {
  /** Controller method to handle adding a new category
   * @param {Object} req the request object recieved from client
   * @param {Object} res the response object to be modified and sent out
   * @returns
   *  422 when Category name cannot be empty,
   *  409 when Category already exist,
   *  400 when Category Name is a mandatory field,
   *  500 when Internal Server error occurs,
   *  200 when Category succesfully Added
   */
  static async addCategory(req, res) {
    try {
      // Check if categoryName is provided in the request body
      if (req.body.categoryName) {
        // Find if category with the same name already exists
        const foundCategory = await Category.findOne({
          categoryName: req.body.categoryName,
        });
        // Check if categoryName is empty
        if (!req.body.categoryName) {
          return res.status(422).send("Category name cannot be empty");
        }
        // If category already exists, return 409 Conflict status
        if (foundCategory) {
          return res.status(409).send("Category already exist");
        } else {
          try {
            // Create a new category
            const response = await Category.create({
              categoryName: req.body.categoryName,
            });
            // Return success message and the created category
            return res
              .status(200)
              .json({ message: "Category successfully Added", response });
          } catch (error) {
            console.log(error);
            return res.status(500).send("Internal Server Error");
          }
        }
      } else {
        // Return 400 Bad Request status if categoryName is not provided
        return res.status(400).send("Category Name is a mandatory field");
      }
    } catch (error) {
      // Return 500 Internal Server Error status for any other errors
      return res.status(500).send("Internal Server Error");
    }
  }

  /** Controller method to get all category
   * @param {Object} req the request object recieved from client
   * @param {Object} res the response object to be modified and sent out
   * @returns
   *  404 when No Categories Found ,
   *  500 when Internal Server error occurs,
   *  200 when Categories succesfully fetched
   */
  static async allCategories(req, res) {
    try {
      // Find all categories
      const categories = await Category.find();
      // Check if no categories are found
      if (categories.length == 0) {
        // Return 404 Not Found status if no categories are found
        return res.status(404).send("No Categories Found. Please add one");
      } else {
        // Return 200 OK status with the list of categories
        return res.status(200).send(categories);
      }
    } catch (error) {
      // Return 500 Internal Server Error status for any other errors
      return res.status(500).send("Internal Server Error");
    }
  }

  /** Controller method to get category
   * @param {Object} req the request object recieved from client
   * @param {Object} res the response object to be modified and sent out
   * @returns
   *  404 when Invalid Category Id ,
   *  500 when Internal Server error occurs,
   *  200 when Category succesfully fetched
   */
  static async getCategory(req, res) {
    try {
      // Find category by ID
      const category = await Category.findById(req.params.id);
      // Check if category is not found
      if (!category) {
        // Return 404 Not Found status if category is not found
        return res.status(404).send("Invalid Category Id");
      } else {
        // Return 200 OK status with the found category
        return res.status(200).send(category);
      }
    } catch (error) {
      // Return 500 Internal Server Error status for any other errors
      return res.status(500).send("Internal Server error");
    }
  }

  /** Controller method to update category
   * @param {Object} req the request object recieved from client
   * @param {Object} res the response object to be modified and sent out
   * @returns
   *  40 when Category ID is required,
   *  422 when Category not found,
   *  400 when Category name cannot be empty,
   *  409 Category name already exists
   *  500 when Internal Server error occurs,
   *  200 when Category succesfully updated
   */
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { categoryName } = req.body;

      // Check if category ID is provided
      if (!id) {
        return res.status(404).send("Category ID is required");
      }

      // Check if category with provided ID exists
      const category = await Category.findById(id);
      if (!category) {
        return res.status(422).send("Category not found");
      }

      // Check if categoryName is provided and not empty
      if (!categoryName) {
        return res.status(400).send("Category name cannot be empty");
      }

      // Check if category with updated name already exists
      const existingCategory = await Category.findOne({
        categoryName: categoryName.toLowerCase(),
        _id: { $ne: id }, // Exclude current category from check
      });
      if (existingCategory) {
        return res.status(409).send("Category name already exists");
      }

      // Update category with new name
      category.categoryName = categoryName;
      const response = await category.save();
      // Return success message and the updated category
      return res
        .status(200)
        .json({ message: "Category updated successfully", response });
    } catch (error) {
      //Return 500 Internal Server Error status for any other errors
      return res.status(500).send("Internal Server Error");
    }
  }

  /** Controller method to delete category
   * @param {Object} req the request object recieved from client
   * @param {Object} res the response object to be modified and sent out
   * @returns
   *  409 when Category ID is required,
   *  404 when Category not found,
   *  500 when Internal Server error occurs,
   *  200 when Category deleted successfully
   */
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      // Check if category ID is provided
      if (!id) {
        return res.status(409).send("Category ID is required");
      }

      // Check if category with provided ID exists
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).send("Category not found");
      }

      // Delete the category
      await Category.deleteOne({ _id: id });

      return res.status(200).send("Category deleted successfully");
    } catch (error) {
      //Return 500 Internal Server Error status for any other errors
      return res.status(500).send("Internal Server Error");
    }
  }

  /** Controller method to get category by name
   * @param {Object} req the request object recieved from client
   * @param {Object} res the response object to be modified and sent out
   * @returns
   *  409 when Category name is required,
   *  404 No categories found with the given name,
   *  500 when Internal Server error occurs,
   *  200 when Category succesfully Fetched
   */
  static async getCategoryByName(req, res) {
    try {
      // Extract categoryName from query parameters
      const { categoryName } = req.query;
      // Check if categoryName is not provided
      if (!categoryName) {
        // Return 409 Conflict status if categoryName is not provided
        return res.status(409).send("Category name is required");
      }

      // Find categories that match the given categoryName (case-insensitive)
      const categories = await Category.find({
        categoryName: { $regex: new RegExp(categoryName, "i") },
      });

      // Check if no categories are found
      if (categories.length === 0) {
        // Return 404 Not Found status if no categories are found
        return res.status(404).send("No categories found with the given name");
      }

      // Return 200 OK status with the found categories
      return res.status(200).send(categories);
    } catch (error) {
      // Log the error and return 500 Internal Server Error status for any other errors
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = CategoryController;
