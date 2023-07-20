const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authentic = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "this is my secret string", (err, decoded) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = res.cookies.jwt;
  if (token) {
    jwt.verify(token, "this is my secret string", async (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decoded);
        let user = await User.findById(decoded.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { authentic, checkUser };
