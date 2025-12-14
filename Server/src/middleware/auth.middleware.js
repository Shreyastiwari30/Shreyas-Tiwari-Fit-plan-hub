const jwt = require("jsonwebtoken");

function authmiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  const userData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = userData;
  next();
}

module.exports = authmiddleware;
