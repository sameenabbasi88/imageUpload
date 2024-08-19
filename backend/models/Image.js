const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
