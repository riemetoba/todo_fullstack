const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/databaseConfig");
const todoRoute = require("./routes/todoRoute");

// ============ middleware ==============

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

// ============ middleware ==============

dbConnection();

// ====================

app.use("/", todoRoutes);

app.listen(5000, () => {
  console.log("server is running");
});