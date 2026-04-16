// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const videoRoutes = require("./routes/video.routes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/video", videoRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// module.exports = app;



// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const videoRoutes = require("./routes/video.routes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // 👇 ADD THIS LINE
// app.use("/uploads", express.static("uploads"));


// app.use("/api/video", videoRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// module.exports = app;



const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// ✅ IMPORTANT FIX (THIS IS MISSING IN YOUR PROJECT)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/video", require("./routes/video.routes"));

module.exports = app;