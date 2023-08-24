const {
  createPool,
} = require("mysql2");

const pool =
  createPool(
    {
      host: "localhost",
      user: "root",
      password:
        "admin",
      database:
        "duanx",
    }
  );

module.exports =
  pool;
