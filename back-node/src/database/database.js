const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const db = async () => {
  try {
    await mongoose
      .connect(process.env.URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
      .then((db) => console.log("Db is connected"))
      .catch((error) => console.error(error));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = mongoose;

/*
Credentials Testing 
 najesmyawuqbrqpkoa@bvhrs.com
 URI = 'mongodb+srv://admin:admin@cluster0.uy87g.mongodb.net/?retryWrites=true&w=majority'
 testpassword*/
