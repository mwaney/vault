const signup_get = (req, res) => {
  res.render("signup");
};
const signup_post = (req, res) => {
  res.send("new Sign Up");
};

const login_get = (req, res) => {
  res.render("login");
};
const login_post = (req, res) => {
  res.send("User Login");
};

module.exports = { signup_get, signup_post, login_get, login_post };
