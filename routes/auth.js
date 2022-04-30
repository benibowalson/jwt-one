const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const { validate_body } = require("../validations/validation");

router.post("/register", validate_body, async (req, res) => {
  // Check if registration already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    res.status(400).send("Email already exists!");
  } else {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed_pw = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const someUser = new User({
      name: req.body.name,
      //password: req.body.password,
      password: hashed_pw,
      email: req.body.email,
    });

    try {
      const savedUser = await someUser.save();
      //res.send(savedUser);
      res.send(savedUser._id);
      //res.send({ user: user._id });
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

router.post("/login", validate_body, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const validPassword = await bcrypt.compare(
      user.password,
      req.body.password
    );

    if (!validPassword) {
      res.send("Invalid Email or Password");
    } else {
      res.send("Logged In!");
    }
  } else {
    res.send("Invalid Email or Password");
  }
});

module.exports = router;
