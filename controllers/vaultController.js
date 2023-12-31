const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "this is my secret string", {
    expiresIn: maxAge,
  });
};

const errorHandler = (err) => {
  console.log(err.message, err.code);
  const errors = { email: "", password: "" };

  // incorrect email error

  if (err.message === "Invalid email") {
    errors.email = "That email is not registered";
  }
  // incorrect password error

  if (err.message === "Invalid password") {
    errors.password = "That password is not correct";
  }

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

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

const login_get = (req, res) => {
  res.render("login");
};
const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(400).json({ errors });
  }
};

const logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = { signup_get, signup_post, login_get, login_post, logout_get };
