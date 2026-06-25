const express = require("express")
const app = express()
const mongoose = require("mongoose");
const { createTodo } = require("./controllers/todoController");

app.use(express.json())



mongoose
  .connect(
    "mongodb+srv://riemehasan06_db_user:9ZreXjKypVe3WQOa@cluster0.kxdszjc.mongodb.net/todo?appName=Cluster0",
  )
  .then(() => {
    console.log("Database Connected Successfully");
  });

app.post("/create/todo", createTodo)

app.listen(5000,()=>{
    console.log("server is running");
    
})