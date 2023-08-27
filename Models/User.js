const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    keepLogging: { type: Boolean },
    salutation: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    address: { type: String },
    country: { type: String },
    postal_code: { type: Number },
    nationality: { type: String },
    birth: { type: String },
    gender: { type: String },
    status: { type: String },
    hobbies: { type: String },
    sport: { type: String },
    music: { type: String },
    movie: { type: String },
    spouse_salutation: { type: String },
    spouse_first_name: { type: String },
    spouse_last_name: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
