const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Auth");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await user.save();
    const { password, ...data } = await result.toJSON();
    res.send(data);
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

module.exports = router;
