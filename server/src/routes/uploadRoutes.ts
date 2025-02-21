import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import staffMiddleware from "../middlewares/staffMiddleware";

const router = express.Router();

// Multer storage to save files to a specific directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + file.originalname.replace(/\s+/g, "_");
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get("/", (req, res) => {
  res.send("Hello from your serverless Express app!");
});

// File upload route
router.post("/", staffMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Image cannot be empty!" });
      return;
    }

    // Construct the file path
    const filePath = `uploads/${req.file.filename}`;

    res
      .status(200)
      .json({ message: "File uploaded successfully!", path: filePath });
    console.log("File uploaded successfully:", filePath);
  } catch (error) {
    console.error("Error during upload:", error);
    res.status(500).json({ message: "The image could not be uploaded!" });
  }
});

// File delete route
router.post("/delete", staffMiddleware, async (req, res) => {
  console.log(req.body);
  const { filename } = req.body; // Expecting the filename in the request body

  if (!filename) {
    res.status(400).json({ error: "Filename is required!" });
    return;
  }

  const filePath = path.join(process.cwd(), filename); // Construct the full file path

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      res.status(500).json({ message: "Could not delete the file!" });
      return;
    }

    res.status(200).json({ message: "File deleted successfully!" });
    console.log("File deleted successfully:", filename);
  });
});

export default router;
