const mongoose = require("mongoose");

// Load .env
require("dotenv").config();
const CONNECTION_URL = process.env.MONGO_URL;

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true })
	.then(() => {
		console.log("MongoDB Connected");
	})
	.catch((error) => {
		console.log(`${error} Connection Abort`);
	});

module.exports = mongoose;
