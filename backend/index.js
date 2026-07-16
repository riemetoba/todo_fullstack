const express = require("express");
const app = express();
const {
  createTodo,
  allTodos,
  todoDelete,
  todoUpdate,
} = require("./controllers/todoController");
const cors = require("cors");
const multer = require("multer");
const dbConnection = require("./config/databaseConfig");

// ============ middleware ==============

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

// ============ middleware ==============

dbConnection();

// ==============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // console.log(file.originalname,Date.now());

    const uniqueSuffix = "img" + "-" + Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// ==============================

app.post("/create/todo", upload.single("image"), createTodo);
app.get("/allTodos", allTodos);
app.delete("/delete/:id", todoDelete);
app.post("/update/:id", todoUpdate);

app.listen(5000, () => {
  console.log("server is running");
});
