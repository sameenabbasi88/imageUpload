const express = require("express");
const router = express.Router();
const Image = require("../models/Image");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ROUTE 1: Add a New Note using: POST
router.post("/", upload.single("image"), async (req, res) => {
    const { name } = req.body;
    const url = req.file.path;
    const filename = req.file.filename;

    const newImage = new Image({
        name,
        image: { url, filename }
    });

    let savedImage = await newImage.save();
    res.send(savedImage);
});
//Route 2: fetching all images
router.get('/', async (req, res) => {
    try {
      const images = await Image.find({});
      res.json(images);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
