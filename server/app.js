require("dotenv").config();

const corsMiddleware = require("./middleware/cors.middleware");

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(corsMiddleware);
app.use(express.json({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_URI, {});
		app.listen(PORT, () =>
			console.log(`App has been started on port ${PORT}...`)
		);
	} catch (e) {
		console.log("Server Error", e.message);
		process.exit(1);
	}
}

start();
