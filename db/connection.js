const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const dbConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

module.exports = dbConnect;
