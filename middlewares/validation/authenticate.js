const jwt = require("jsonwebtoken");
const User = require("../../db/models/userModel");
const { JWT_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  try {
    const { id } = jwt.verify(token, JWT_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authenticate;
