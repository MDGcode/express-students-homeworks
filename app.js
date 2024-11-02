const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const sequelize = require("./config");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Routes
const studentRoutes = require("./routes/student");

const homeworkRoutes = require("./routes/homework");
app.use("/api/students", studentRoutes);
app.use("/api/homeworks", homeworkRoutes);
// Start server
if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports.handler = serverless(app);
