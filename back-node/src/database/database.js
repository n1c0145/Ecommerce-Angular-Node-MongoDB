const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const db = async () => {
  await mongoose
    .connect(process.env.URI)
    .then((d) => console.log("Db is connected"))
    .catch((error) => console.error(error));
};

module.exports = db;

// wpulhnfanfksuqjhvw@nthrl.com

// testpassword
