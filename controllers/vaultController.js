const User = require("../models/User");

const errorHandler = (err) => {
  console.log(err.message, err.code);
  const errors = { email: "", password: "" };

  // duplicate error
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }
  if (err.message.includes("User validation failed")) {
    // validation errors
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const signup_get = (req, res) => {
  res.render("signup");
};
const signup_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({
      email,
      password,
    });
    res.status(201).send(user);
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).send(errors);
  }
};

const login_get = (req, res) => {
  res.render("login");
};
const login_post = async (req, res) => {
  res.send("User Login");
};

module.exports = { signup_get, signup_post, login_get, login_post };
