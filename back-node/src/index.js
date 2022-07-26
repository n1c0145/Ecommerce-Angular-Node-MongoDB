const express = require("express");
const db = require("./database/database");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Db connection
db();


// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/productos', require('./routes/producto'));

// Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
  });