const Todo = require("../models/todoModel");

const createTodo = (req, res) => {
  const { task, priority, path } = req.body;
  console.log(req.file.path);

  if (!task || !priority) {
    return res.send({
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

  res.send({
    success: true,
    message: "todo created",
  });
};
// ==================

const allTodos = async (req, res) => {
  try {
    let data = await Todo.find({});
    res.send({
      success: true,
      message: "Todo collected",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
// ========================

let todoDelete = async (req, res) => {
  try {
    const { id } = req.params;
    let deleteTodo = await Todo.findByIdAndDelete(id);
    res.send({
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
    res.send({
      success: true,
      message: "Todo update",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createTodo, allTodos, todoDelete, todoUpdate };
