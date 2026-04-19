const router = require("express").Router();
const multer = require("multer");

const upload = multer({
  dest: "uploads/",
});

const { trimVideo } = require("../controllers/trimController");

router.post("/trim", upload.single("video"), trimVideo);

module.exports = router;