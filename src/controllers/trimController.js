// const ffmpeg = require("fluent-ffmpeg");
// const path = require("path");
// const fs = require("fs");

// exports.trimVideo = async (req, res) => {
//   try {
//     console.log("🔥 TRIM API HIT");

//     const file = req.file;

//     console.log("FILE:", file);
//     console.log("BODY:", req.body);

//     if (!file) {
//       return res.status(400).json({
//         error: "No video uploaded",
//       });
//     }

//     const trimStart = Number(req.body.trimStart);
//     const trimEnd = Number(req.body.trimEnd);

//     console.log("START:", trimStart);
//     console.log("END:", trimEnd);

//     if (isNaN(trimStart) || isNaN(trimEnd)) {
//       return res.status(400).json({
//         error: "Trim values are not numbers",
//       });
//     }

//     if (trimStart >= trimEnd) {
//       return res.status(400).json({
//         error: "Trim End must be greater than Start",
//       });
//     }

//     const uploadsDir = path.join(__dirname, "../uploads");

//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir);
//     }

//     const inputPath = file.path;

//     console.log("INPUT PATH:", inputPath);

//     if (!fs.existsSync(inputPath)) {
//       return res.status(400).json({
//         error: "Input file missing",
//       });
//     }

//     const outputPath = path.join(
//       uploadsDir,
//       `trim-${Date.now()}.mp4`
//     );

//     console.log("OUTPUT PATH:", outputPath);

//     ffmpeg(inputPath)
//       .setStartTime(trimStart)
//       .setDuration(trimEnd - trimStart)
//       .output(outputPath)
//       .on("start", (cmd) => {
//         console.log("FFMPEG START:", cmd);
//       })
//       .on("end", () => {
//         console.log("✅ TRIM DONE");

//         return res.json({
//           file: `http://localhost:10000/uploads/${path.basename(outputPath)}`
//           //file: `uploads/${path.basename(outputPath)}`,
//         });
//       })
//       .on("error", (err) => {
//         console.log("❌ FFMPEG ERROR:", err);

//         return res.status(500).json({
//           error: err.message,
//         });
//       })
//       .run();

//   } catch (err) {
//     console.log("❌ SERVER ERROR:", err);

//     res.status(500).json({
//       error: err.message,
//     });
//   }
// };



// const ffmpeg = require("fluent-ffmpeg");
// const path = require("path");
// const fs = require("fs");

// exports.trimVideo = async (req, res) => {
//   try {
//     console.log("🔥 TRIM API HIT");

//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ error: "No video uploaded" });
//     }

//     const trimStart = Number(req.body.trimStart);
//     const trimEnd = Number(req.body.trimEnd);

//     if (isNaN(trimStart) || isNaN(trimEnd) || trimStart >= trimEnd) {
//       return res.status(400).json({ error: "Invalid trim values" });
//     }

//     const uploadsDir = path.join(__dirname, "../uploads");
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir);
//     }

//     const inputPath = file.path;
//     const outputPath = path.join(uploadsDir, `trim-${Date.now()}.mp4`);

    

//     ffmpeg(inputPath)
//   // ✅ correct seeking method
//   .inputOptions([
//     `-ss ${trimStart}`
//   ])

//   .duration(trimEnd - trimStart)

//   // ✅ force proper encoding (IMPORTANT)
//   .videoCodec("libx264")
//   .audioCodec("aac")

//   .outputOptions([
//     "-preset superfast",
//     "-pix_fmt yuv420p",
//     "-movflags +faststart"
//   ])

//   .output(outputPath)

//   .outputOptions([
//   "-vf scale=trunc(iw/2)*2:trunc(ih/2)*2",
//   "-pix_fmt yuv420p",
//   "-movflags +faststart"
// ])

    
//       .on("start", (cmd) => {
//         console.log("FFMPEG START:", cmd);
//       })
//       .on("end", () => {
//         console.log("✅ TRIM DONE");
//         return res.json({
//           file: `http://localhost:10000/uploads/${path.basename(outputPath)}`,
//         });
//       })
//       .on("error", (err) => {
//         console.log("❌ FFMPEG ERROR:", err);
//         return res.status(500).json({ error: err.message });
//       })
//       .run();

//   } catch (err) {
//     console.log("❌ SERVER ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };


// const ffmpeg = require("fluent-ffmpeg");
// const path = require("path");
// const fs = require("fs");

// exports.trimVideo = async (req, res) => {
//   try {
//     console.log("🔥 TRIM API HIT");

//     const file = req.file;
//     if (!file) return res.status(400).json({ error: "No video uploaded" });

//     const trimStart = Number(req.body.trimStart) || 0;
//     const trimEnd = Number(req.body.trimEnd);
//     const duration = trimEnd - trimStart;

//     const uploadsDir = path.join(__dirname, "../uploads");
//     if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

//     const inputPath = file.path;
//     const outputPath = path.join(uploadsDir, `trim-${Date.now()}.mp4`);

//     ffmpeg(inputPath)
//       // 1. DO NOT use seekInput or inputOptions here. 
//       // 2. We put seeking in outputOptions to force "Output Seeking" (Slow but Accurate)
//       // .outputOptions([
//       //   `-ss ${trimStart}`, 
//       //   `-t ${duration}`,
//       //   "-vcodec libx264",
//       //   "-acodec aac",
//       //   "-crf 18",
//       //   "-preset superfast",
//       //   "-pix_fmt yuv420p",
//       //   "-vf scale=trunc(iw/2)*2:trunc(ih/2)*2"
//       // ])



//       .outputOptions([
//   `-ss ${trimStart}`, 
//   `-t ${duration}`,
//   "-vcodec libx264",
//   "-acodec aac",
//   "-crf 18",
//   "-preset superfast",
//   "-pix_fmt yuv420p",
//   "-movflags +faststart", // Add this back!
//   "-vf scale=trunc(iw/2)*2:trunc(ih/2)*2"
// ])
//       .output(outputPath)
//       .on("start", (cmd) => {
//         console.log("🚀 EXECUTING:", cmd);
//       })
//       .on("end", () => {
//         console.log("✅ TRIM DONE");
//         // Ensure we only send ONE response
//         if (!res.headersSent) {
//           return res.json({
//             file: `http://localhost:10000/uploads/${path.basename(outputPath)}`,
//           });
//         }
//       })
//       .on("error", (err) => {
//         console.error("❌ FFMPEG ERROR:", err);
//         if (!res.headersSent) {
//           return res.status(500).json({ error: err.message });
//         }
//       })
//       .run();

//   } catch (err) {
//     console.error("❌ SERVER ERROR:", err);
//     if (!res.headersSent) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// };



// const path = require("path");
// const fs = require("fs");
// const ffmpeg = require("fluent-ffmpeg");

// exports.trimVideo = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).json({ error: "No file" });

//     const trimStart = Number(req.body.trimStart) || 0;
//     const trimEnd = Number(req.body.trimEnd);

//     // 1. POINT TO THE ROOT UPLOADS FOLDER (Matches your server.js)
//     // process.cwd() gets C:\letest\ygradpath-backend
//     const uploadsDir = path.join(process.cwd(), "uploads"); 

//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     const inputPath = file.path; // This is already in C:\...\backend\uploads
//     const outputFilename = `trim-${Date.now()}.mp4`;
//     const outputPath = path.join(uploadsDir, outputFilename);

//     ffmpeg(inputPath)
//       // .outputOptions([
//       //   `-ss ${trimStart}`, 
//       //   `-t ${trimEnd - trimStart}`,
//       //   "-vcodec libx264",
//       //   "-acodec aac",
//       //   "-crf 18",
//       //   "-preset superfast",
//       //   "-pix_fmt yuv420p",
//       //   "-movflags +faststart",
//       //   "-vf scale=trunc(iw/2)*2:trunc(ih/2)*2"
//       // ])


//       .outputOptions([
//   "-ss", trimStart.toString(),      // Accurate seek
//   "-t", (trimEnd - trimStart).toString(),
//   "-vcodec libx264",
//   "-acodec aac",
//   "-crf 18",                         // High quality
//   "-preset superfast",
//   "-pix_fmt yuv420p",                // Standard colors
//   "-map_metadata -1",                // Strip old metadata that might confuse the player
//   "-movflags +faststart",            // Enable web streaming
//   "-vf scale=trunc(iw/2)*2:trunc(ih/2)*2"
// ])
//       .output(outputPath)
//       .on("start", (cmd) => console.log("🚀 Executing:", cmd))
//       .on("end", () => {
//         console.log("✅ Video saved to root uploads folder");
//         if (!res.headersSent) {
//           return res.json({
//             // Now this URL will actually find the file!
//             file: `http://localhost:10000/uploads/${outputFilename}`,
//           });
//         }
//       })
//       .on("error", (err) => {
//         console.error("❌ FFmpeg Error:", err);
//         if (!res.headersSent) res.status(500).json({ error: err.message });
//       })
//       .run();

//   } catch (err) {
//     console.error("❌ Catch Error:", err);
//     if (!res.headersSent) res.status(500).send("Server Error");
//   }
// };




const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

exports.trimVideo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No video uploaded" });

    const trimStart = Number(req.body.trimStart) || 0;
    const trimEnd = Number(req.body.trimEnd) || 0;
    const duration = trimEnd - trimStart;

    // Use process.cwd() to hit the project root/uploads
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const inputPath = file.path;
    const outputFilename = `trim-${Date.now()}.mp4`;
    const outputPath = path.join(uploadsDir, outputFilename);

    ffmpeg(inputPath)
      .outputOptions([
        `-ss ${trimStart}`,    // Seek after input (Slow seek = no blank frames)
        `-t ${duration}`,      // Cut duration
        "-vcodec libx264",     // Re-encode to fix keyframe issues
        "-acodec aac",
        "-preset superfast",
        "-crf 22",
        "-pix_fmt yuv420p",    // Max compatibility
        "-movflags +faststart" // Crucial for web players
      ])
      .output(outputPath)
      .on("end", () => {
        console.log("✅ Video Trimmed Successfully");
        // Clean up the original uploaded file (Multer's temp file)
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);

        // Return the FULL URL directly
        return res.json({
          file: `http://localhost:10000/uploads/${outputFilename}`,
        });
      })
      .on("error", (err) => {
        console.error("FFMPEG ERROR:", err);
        if (!res.headersSent) res.status(500).json({ error: err.message });
      })
      .run();

  } catch (err) {
    console.error("SERVER ERROR:", err);
    if (!res.headersSent) res.status(500).json({ error: "Internal Server Error" });
  }
};








