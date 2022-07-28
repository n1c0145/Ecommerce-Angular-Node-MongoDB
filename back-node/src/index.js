const express = require("express");
const db = require("./database/database");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser')

const app = express();

// Db connection
db();


// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())
app.use(cors())

// Routes
app.use('/api/productos', require('./routes/producto'));
app.use('/api/auth', require('./routes/auth'))

// Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
  });