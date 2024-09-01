const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "todoapp_talesblew",
  "todoapp_talesblew",
  "6becfa6f9c51256a2ec7582bddd8bf271b6a772e",
  {
    host: "xis.h.filess.io",
    dialect: "mysql",
    port: 3307,
  }
);

sequelize
  .authenticate()
  .then((res) => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
