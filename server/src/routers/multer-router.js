import { Router } from "express";
import { rmSync } from "fs";

const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploader = multer({ storage: storage });

const multerRouter = Router();

multerRouter.get("/img", (req, res, next) => {
  res.render("index");
});

multerRouter.post("/img-upload", uploader.single("imgFile"), (req, res, next) => {
  try {
    const imgPath = `${req.file.path}`;
    const imgData = fs.readFileSync(imgPath).toString("base64");
    res.json({ path: imgPath });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export { multerRouter };
