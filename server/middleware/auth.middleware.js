const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Нет авторизации" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    return next();
  } catch (e) {
    console.log(e);
    if (e.name === "TokenExpiredError") {
      return res.status(401).redirect("/");
    } else {
      return res.status(401).json({ message: "Нет авторизации" });
    }
  }
};
