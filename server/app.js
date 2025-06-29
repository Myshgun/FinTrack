require("dotenv").config();
const cors = require("cors");
const corsMiddleware = require("./middleware/cors.middleware");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(corsMiddleware);

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    app.listen(5000, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
