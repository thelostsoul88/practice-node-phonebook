const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Contact = model("contact", contactSchema);

module.exports = contactSchema;
