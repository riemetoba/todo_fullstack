const Todo = require("../models/todoModel");

const createTodo = (req, res) => {
  const { task, priority, path } = req.body;
  console.log(req.file.path);

  if (!task || !priority) {
    return res.status(400).json({
      success: false,
      message: "Please provide both task and priority.",
    });
  }
  // ======================

  const todo = new Todo({
    task: task,
    priority: priority,
    path: req.file.path,
  });

  todo.save();

  res.status(201).json({
    success: true,
    message: "todo created",
  });
};
// ==================

const allTodos = async (req, res) => {
  try {
    let data = await Todo.find({});
    res.status(200).json({
      success: true,
      message: "Todo collected",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
// ========================

let todoDelete = async (req, res) => {
  try {
    const { id } = req.params;
    let deleteTodo = await Todo.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Todo deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
// ==========================

let todoUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    let deleteTask = await Todo.findByIdAndUpdate({ _id: id }, req.body);
    res.json({
      success: true,
      message: "Todo update",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createTodo, allTodos, todoDelete, todoUpdate };
