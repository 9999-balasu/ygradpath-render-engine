



// const ffmpeg = require("fluent-ffmpeg");
// const path = require("path");
// const { promisify } = require("util");
// const ffprobe = promisify(ffmpeg.ffprobe);

// exports.mergeTimeline = async (req, res) => {
//   try {
//     const videos = req.files["videos"] || [];
//     const audios = req.files["audios"] || [];
//     const metadata = JSON.parse(req.body.audioMetadata || "[]");
//     const outputPath = path.resolve(`uploads/render-${Date.now()}.mp4`);

//     // 1. Get exact video durations to calculate anchor points
//     const videoData = await Promise.all(videos.map(v => ffprobe(path.resolve(v.path))));
//     const durations = videoData.map(d => parseFloat(d.format.duration));

//     let filters = [];
//     let audioStreams = [];
//     const vCount = videos.length;

//     // 2. Video Processing: Scale, Pad, and Concat
//     let videoConcatStr = "";
//     videos.forEach((_, i) => {
//       filters.push(
//         { filter: "scale", options: "1280:720:force_original_aspect_ratio=decrease", inputs: `${i}:v`, outputs: `v${i}s` },
//         { filter: "pad", options: "1280:720:(ow-iw)/2:(oh-ih)/2:black", inputs: `v${i}s`, outputs: `v${i}f` }
//       );
//       videoConcatStr += `[v${i}f]`;
//     });
//     filters.push({ filter: "concat", options: { n: vCount, v: 1, a: 0 }, inputs: videoConcatStr, outputs: "v_merged" });

//     // 3. Audio Processing: Apply "adelay" based on Drag Position
//     audios.forEach((_, i) => {
//       const meta = metadata[i];
//       let anchorStart = 0;
//       // Calculate start time based on the video it was dropped on
//       for (let j = 0; j < meta.videoIndex; j++) {
//         anchorStart += durations[j];
//       }

//       const totalDelay = Math.round((anchorStart + meta.offset) * 1000);
//       filters.push({
//         filter: "adelay",
//         options: `${totalDelay}|${totalDelay}`,
//         inputs: `${vCount + i}:a`,
//         outputs: `a${i}`
//       });
//       audioStreams.push(`[a${i}]`);
//     });

//     // 4. Mix all audios
//     if (audioStreams.length > 0) {
//       filters.push({
//         filter: "amix",
//         options: { inputs: audioStreams.length, duration: "longest" },
//         inputs: audioStreams.join(""),
//         outputs: "a_final"
//       });
//     }

//     // 5. Execute FFmpeg
//     let command = ffmpeg();
//     [...videos, ...audios].forEach(f => command.input(path.resolve(f.path)));

//     command
//       .complexFilter(filters)
//       .outputOptions(["-map [v_merged]", audioStreams.length > 0 ? "-map [a_final]" : "-map 0:a", "-c:v libx264", "-pix_fmt yuv420p", "-shortest"])
//       .on("end", () => res.json({ url: `http://localhost:5000/uploads/${path.basename(outputPath)}` }))
//       .on("error", (err) => res.status(500).json({ error: err.message }))
//       .save(outputPath);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };








const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs"); // ఫైల్స్ డిలీట్ చేయడానికి
const { promisify } = require("util");
const ffprobe = promisify(ffmpeg.ffprobe);
const cloudinary = require("../config/cloudinary"); // మీ క్లౌడినరీ కాన్ఫిగరేషన్

exports.mergeTimeline = async (req, res) => {
  try {
    const videos = req.files["videos"] || [];
    const audios = req.files["audios"] || [];
    const metadata = JSON.parse(req.body.audioMetadata || "[]");
    //const outputPath = path.resolve(`uploads/render-${Date.now()}.mp4`);
    // const outputPath = path.join(__dirname, "../uploads", `render-${Date.now()}.mp4`);

    const outputPath = path.join(__dirname, "../uploads", `render-${Date.now()}.mp4`);

    // 1. Get exact video durations
    // const videoData = await Promise.all(videos.map(v => ffprobe(v.path)));

    const videoData = await Promise.all(
  videos.map(v => {
    console.log("VIDEO PATH:", v.path); // debug
    return ffprobe(v.path);
  })
);
    const durations = videoData.map(d => parseFloat(d.format.duration));

    let filters = [];
    let audioStreams = [];
    const vCount = videos.length;

    // 2. Video Processing
    let videoConcatStr = "";
    videos.forEach((_, i) => {
      filters.push(
        { filter: "scale", options: "1280:720:force_original_aspect_ratio=decrease", inputs: `${i}:v`, outputs: `v${i}s` },
        { filter: "pad", options: "1280:720:(ow-iw)/2:(oh-ih)/2:black", inputs: `v${i}s`, outputs: `v${i}f` }
      );
      videoConcatStr += `[v${i}f]`;
    });
    filters.push({ filter: "concat", options: { n: vCount, v: 1, a: 0 }, inputs: videoConcatStr, outputs: "v_merged" });

    // 3. Audio Processing
    audios.forEach((_, i) => {
      const meta = metadata[i];
      let anchorStart = 0;
      for (let j = 0; j < meta.videoIndex; j++) {
        anchorStart += durations[j];
      }

      const totalDelay = Math.round((anchorStart + meta.offset) * 1000);
      filters.push({
        filter: "adelay",
        options: `${totalDelay}|${totalDelay}`,
        inputs: `${vCount + i}:a`,
        outputs: `a${i}`
      });
      audioStreams.push(`[a${i}]`);
    });

    // 4. Mix all audios
    if (audioStreams.length > 0) {
      filters.push({
        filter: "amix",
        options: { inputs: audioStreams.length, duration: "longest" },
        inputs: audioStreams.join(""),
        outputs: "a_final"
      });
    }

    // 5. Execute FFmpeg
    let command = ffmpeg();
    // [...videos, ...audios].forEach(f => command.input(f.path));

    [...videos, ...audios].forEach(f => {
  console.log("INPUT PATH:", f.path); // debug
  command.input(f.path);
});

    command
      .complexFilter(filters)
      .outputOptions([
        "-map [v_merged]",
        audioStreams.length > 0 ? "-map [a_final]" : "-map 0:a",
        "-c:v libx264",
        "-preset ultrafast", // వేగంగా రెండర్ అవ్వడానికి
        "-pix_fmt yuv420p",
        "-shortest"
      ])
      .on("end", async () => {
        try {
          // Cloudinaryకి అప్‌లోడ్
          const result = await cloudinary.uploader.upload(outputPath, {
            resource_type: "video",
            folder: "rendered_videos"
          });

          // లోకల్ ఫైల్స్ క్లీనప్ (Delete)
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
          videos.forEach(v => { if (fs.existsSync(v.path)) fs.unlinkSync(v.path); });
          audios.forEach(a => { if (fs.existsSync(a.path)) fs.unlinkSync(a.path); });

          // Cloudinary URL పంపడం
          res.json({ url: result.secure_url });
        } catch (uploadErr) {
          res.status(500).json({ error: "Cloudinary upload failed" });
        }
      })
      .on("error", (err) => res.status(500).json({ error: err.message }))
      .save(outputPath);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};