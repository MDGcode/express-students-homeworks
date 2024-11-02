const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const StudentHomework = sequelize.define("StudentHomework", {
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Sync with database
sequelize
  .sync()
  .then(() => console.log("Homework and Student tables created"))
  .catch((err) => console.log("Error: " + err));

module.exports = StudentHomework;
