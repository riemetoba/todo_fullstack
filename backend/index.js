const express = require("express");
const app = express();
const {
  createTodo,
  allTodos,
  todoDelete,
  todoUpdate,
} = require("./controllers/todoController");
const cors = require("cors");
const dbConnection = require("./config/databaseConfig");
const upload = require ("./utils/storage")

// ============ middleware ==============

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

// ============ middleware ==============

dbConnection();

// ====================

app.post("/create/todo", upload.single("image"), createTodo);
app.get("/allTodos", allTodos);
app.delete("/delete/:id", todoDelete);
app.post("/update/:id", todoUpdate);

app.listen(5000, () => {
  console.log("server is running");
});
