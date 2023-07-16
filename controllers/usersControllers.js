const User = require("../db/models/userModel");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
const path = require("path");

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
  res.json({
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
  const { email, name, avatar } = req.user;

  res.json({ name, email, avatar } );
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      message: "File is not upload",
    });
  }

  const { _id } = req.user;
  const { path: tmpPath, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;

  const avatarDir = path.join(__dirname, "../public/avatars");

  const resultUrl = path.join(avatarDir, fileName);

  await fs.rename(tmpPath, resultUrl);

  const avatarUrl = path.join("avatars", fileName);

  await User.findByIdAndUpdate(_id, { avatar: avatarUrl });

  res.json({
    avatar: avatarUrl,
  });
};

module.exports = { register, login, logout, current, updateAvatar };
