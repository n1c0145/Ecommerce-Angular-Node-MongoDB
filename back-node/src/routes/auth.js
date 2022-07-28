const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Auth");
const jwt = require('jsonwebtoken')

//Create user
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

//Login user

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).send({
                message: 'user not found'
            })
        }
        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({
                message: 'invalid credentials'
            })
        }
        const token = jwt.sign({_id: user._id}, "secret")
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        res.send({
            mesage:'success'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
});

module.exports = router;
