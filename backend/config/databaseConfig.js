const mongoose = require("mongoose");


const dbConnection = () => {
  return mongoose
    .connect(
      "mongodb+srv://riemehasan06_db_user:9ZreXjKypVe3WQOa@cluster0.kxdszjc.mongodb.net/todo?appName=Cluster0",
    )
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};


module.exports = dbConnection