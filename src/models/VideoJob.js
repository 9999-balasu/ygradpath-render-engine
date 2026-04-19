// const mongoose = require("mongoose");

// const videoJobSchema = new mongoose.Schema({
//   status: { type: String, default: "processing" },
//   inputFile: String,
//   outputFile: String,
//   progress: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("VideoJob", videoJobSchema);



// const mongoose = require("mongoose");

// const videoJobSchema =
// new mongoose.Schema({

//   status: {
//     type: String,
//     default: "processing"
//   },

//   inputFile: String,

//   outputFile: String,

//   // ✂️ ADD THESE
//   start: Number,

//   end: Number,

//   progress: {
//     type: Number,
//     default: 0
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now
//   },

// });

// module.exports =
// mongoose.model(
//  "VideoJob",
//  videoJobSchema
// );

// const mongoose = require("mongoose");

// const videoJobSchema = new mongoose.Schema({
//   status: {
//     type: String,
//     // Enum ensures only valid states are saved
//     enum: ["pending", "processing", "done", "failed"],
//     default: "pending",
//   },

//   inputFile: {
//     type: String,
//     required: true,
//   },

//   outputFile: {
//     type: String,
//   },

//   // ✂️ Trim Settings
//   start: {
//     type: Number,
//     required: true,
//     min: 0,
//   },

//   end: {
//     type: Number,
//     required: true,
//     // Custom validator to ensure end is after start
//     validate: {
//       validator: function (value) {
//         return value > this.start;
//       },
//       message: "End time must be greater than start time",
//     },
//   },

//   progress: {
//     type: Number,
//     default: 0,
//     min: 0,
//     max: 100,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//     index: true, // Speeds up sorting by date
//   },
// });

// module.exports = mongoose.model("VideoJob", videoJobSchema);



const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const VideoJob = require("../models/VideoJob");
const ffmpegWorker = require("../workers/ffmpegWorker");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// 1. Upload
router.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  const fullPath = path.join(process.cwd(), req.file.path);
  res.json({ filePath: fullPath });
});

// 2. Start Trim
router.post("/trim", async (req, res) => {
  const job = await VideoJob.create({
    status: "processing",
    inputFile: req.body.inputFile,
    start: req.body.start,
    end: req.body.end,
  });

  // Call worker immediately (don't await it!)
  ffmpegWorker(job._id); 

  res.json({ jobId: job._id });
});

// 3. Check Status
router.get("/status/:id", async (req, res) => {
  const job = await VideoJob.findById(req.params.id);
  if (!job) return res.status(404).json({ status: "not found" });
  res.json({
    status: job.status,
    progress: job.progress,
    file: job.outputFile,
  });
});

module.exports = router;