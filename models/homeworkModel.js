const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Homework = sequelize.define("Homework", {
  subject: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Homework;

// Sync with database
sequelize
  .sync()
  .then(() => console.log("Homework table created"))
  .catch((err) => console.log("Error: " + err));

module.exports = Homework;
