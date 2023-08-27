const Post = require("../Models/Post");
const postRoute = require("express").Router();

/** GET: http://localhost:5000/api/post */
postRoute.get("/", (req, res) => {
  try {
    Post.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
});

/** POST: http://localhost:5000/api/post/uploads  */
postRoute.post("/uploads", async (req, res) => {
  const body = req.body;
  try {
    const newImage = await Post.create(body);
    newImage.save();
    res.status(201).json({ msg: "New image uploaded...!" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

module.exports = postRoute;
