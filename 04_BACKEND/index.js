// external dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// configuring the dotenv environment
require("dotenv").config()
const PORT = process.env.PORT || 5000;

// internal dependencies: sub routes
const categories = require("./routes/categoriesRoutes.js");
const checkouts = require("./routes/checkoutRoutes.js");
const users = require("./routes/userRoutes.js");
const transactions = require("./routes/transactionRoutes.js");
const products = require("./routes/productRoutes.js");


// internal dependencies: to establish connection to database
const connectDB = require("./services/databaseService.js");

// create an Express application
const app = express();

// Express application configuration
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// re-routing to sub-routes
app.use("/api/users", users);
app.use("/api/checkout", checkouts);
app.use("/api/category", categories);
app.use("/api/transaction", transactions);
app.use("/api/product", products);
// app.use("/api", emailVerificationRoutes);

/** Helper function, asynchronous to start the Express application
 * only if the connection to the database is successful.
*/
const startServer = async () => {
	const isDbConnected = await connectDB()
	if (isDbConnected) {
		app.listen(PORT, console.log(`Server running on port ${PORT}`));
	} else {
		console.log('Cannot connect to DB. Check and try again.')
	}
}

startServer()
