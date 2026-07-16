const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
  createTodo,
  allTodos,
  todoDelete,
  todoUpdate,
} = require("./controllers/todoController");
const cors = require("cors");
const multer = require("multer");


app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

// ==============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // console.log(file.originalname,Date.now());
    
    const uniqueSuffix = 'img' + '-' + Date.now();
    cb(null,uniqueSuffix + '-' + file.originalname );
  },
});

const upload = multer({ storage: storage });
// ==============================

mongoose
  .connect(
    "mongodb+srv://riemehasan06_db_user:9ZreXjKypVe3WQOa@cluster0.kxdszjc.mongodb.net/todo?appName=Cluster0",
  )
  .then(() => {
    console.log("Database Connected Successfully");
  }).catch(error =>{
    console.log(error);
    
  })

app.post("/create/todo",upload.single("image"), createTodo);
app.get("/allTodos", allTodos);
app.delete("/delete/:id", todoDelete);
app.post("/update/:id", todoUpdate);


app.listen(5000, () => {
  console.log("server is running");
});
