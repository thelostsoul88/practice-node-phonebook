const User = require("../db/models/userModel");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({ message: "Email in use" });
      return;
    }

    const avatar = gravatar.url(email);

    const newUser = new User({
      name,
      email,
      password,
      avatar,
    });

    await newUser.hashPassword(password);

    await newUser.save();

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, JWT_KEY);

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      user: {
        name,
        email,
        avatar,
      },
      token,
    });
  } catch (error) {}
};

module.exports = { register };
