const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require(path.join(__dirname, "/Routes/auth.js"));
const userRoute = require(path.join(__dirname, "/Routes/user.js"));
const postRoute = require(path.join(__dirname, "/Routes/post.js"));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000!");
});
