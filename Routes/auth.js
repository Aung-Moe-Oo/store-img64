const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    userid: req.body.userid,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const existingUser = await User.findOne({ userid: req.body.userid });
    if (existingUser) {
      return res.status(401).json("Your email has already been registered.");
    }
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });
    if (!user) {
      return res
        .status(401)
        .json("Your user ID and/or password does not match.");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res
        .status(401)
        .json("Your user ID and/or password does not match.");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: req.body.keepLogging ? "1d" : "15m" }
    );

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout

router.post("/logout", async (req, res) => {
  try {
    res
      .clearCookie("access_token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("User has been logged out.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
