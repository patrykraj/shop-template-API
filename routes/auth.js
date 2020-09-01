const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const {
  registerValidation,
  loginValidation,
} = require("../validators/validation");

router.post("/register", async (req, res) => {
  //validation before creating user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  //check if the email is unique
  const emailExists = await User.findOne({ email: email });
  if (emailExists) return res.status(400).send("Email already exists.");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;
});

module.exports = router;
