const User = require("../db/models/userModel");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { JWT_KEY, JWT_EXPIRESIN } = process.env;

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

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Wrong email or password" });
    return;
  }
  const result = await user.comparePassword(password);
  if (!result) {
    res.status(401).json({ message: "Wrong email or password" });
    return;
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    user: {
      name: user.name,
      email,
      avatar: user.avatar,
    },
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).send();
};

const current = async (req, res) => {
  console.log(req.user);
  const { email, name, avatar } = req.user;

  res.status(200).json({ user: { name, email, avatar } });
};

module.exports = { register, login, logout, current };
