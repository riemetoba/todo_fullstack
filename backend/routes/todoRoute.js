const express = require("express");
const router = express.Router();
const {
  createTodo,
  allTodos,
  todoDelete,
  todoUpdate,
} = require("../controllers/todoController");
const upload = require("../utils/storage");

router.post("/create/todo", upload.single("image"), createTodo);
router.get("/allTodos", allTodos);
router.delete("/delete/:id", todoDelete);
router.post("/update/:id", todoUpdate);

module.exports = router;