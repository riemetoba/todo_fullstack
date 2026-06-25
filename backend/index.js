const express = require("express")
const app = express()
const mongoose = require("mongoose");
const { createTodo } = require("./controllers/todoController");
const cors = require ("cors")

app.use(express.json())
app.use(cors())



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