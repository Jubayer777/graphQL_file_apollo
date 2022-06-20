const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
