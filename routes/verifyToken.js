const jwt = require("jsonwebtoken");

const confirmToken = (req, res, next) => {
  const token = req.header("auth-token"); // 'auth-token' was our key
  if (!token) {
    return res.status(401).send("Access Denied!");
  } else {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token");
    }
  }
};

module.exports = confirmToken;
