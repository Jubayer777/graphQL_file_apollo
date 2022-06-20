const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Slider", sliderSchema);
