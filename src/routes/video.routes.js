// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/multer");
// const controller = require("../controllers/video.controller");

// router.get("/", controller.getVideos);

// router.post("/upload", upload.single("video"), controller.uploadVideo);

// router.post(
//   "/merge",
//   upload.fields([
//     { name: "video", maxCount: 1 },
//     { name: "audio", maxCount: 1 },
//   ]),
//   controller.mergeVideoAudio
// );

// router.post(
//   "/merge-multiple",
//   upload.array("videos", 10),
//   controller.mergeMultipleVideos
// );


// router.post(
//   "/merge-timeline",
//   upload.fields([
//     { name: "videos" },
//     { name: "audios" },
//   ]),
//   controller.mergeTimeline
// );
// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/video.controller");
// const upload = require("../middleware/upload");

// // 🔥 IMPORTANT
// router.post(
//   "/merge-timeline",
//   upload.fields([
//     { name: "videos", maxCount: 10 },
//     { name: "audios", maxCount: 10 },
//   ]),
//   controller.mergeTimeline
// );

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/video.controller");
// const upload = require("../middleware/upload");

// // ఇక్కడ controller.mergeTimeline కి బదులుగా 
// // కంట్రోలర్‌లో ఉన్న ఫంక్షన్ పేరును వాడాలి.
// router.post(
//   "/merge-timeline",
//   upload.fields([
//     { name: "videos", maxCount: 10 },
//     { name: "audios", maxCount: 10 },
//   ]),
//   controller.mergeMultipleVideos // ఇక్కడ పేరు మార్చాను
// );

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/video.controller");
// const upload = require("../middleware/upload");

// router.post(
//   "/merge-timeline",
//   upload.fields([
//     { name: "videos", maxCount: 10 },
//     { name: "audios", maxCount: 10 },
//   ]),
//   controller.mergeTimeline
// );

// module.exports = router;


const express = require("express");
const router = express.Router();
const controller = require("../controllers/video.controller");
const uploadMiddleware = require("../middleware/upload"); // This is now the .fields() function

// Use the middleware directly
router.post("/merge-timeline", uploadMiddleware, controller.mergeTimeline);

module.exports = router;