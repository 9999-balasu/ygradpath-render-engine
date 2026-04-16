



// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;


// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Ensure uploads directory exists
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit (adjust as needed)
// });

// // Export the fields configuration directly
// module.exports = upload.fields([
//   { name: "videos", maxCount: 20 },
//   { name: "audios", maxCount: 20 },
// ]);




const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// MUST USE FIELDS to capture multiple arrays
module.exports = upload.fields([
  { name: "videos", maxCount: 20 },
  { name: "audios", maxCount: 20 }
]);