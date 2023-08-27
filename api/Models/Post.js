const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  myFile: String,
});

module.exports = mongoose.models.posts || mongoose.model("post", postSchema);
