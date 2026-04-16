// const app = require("./app");

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// require("dotenv").config();

// const app = require("./app");
// const connectDB = require("./config/db");

// connectDB();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// require("dotenv").config();
// const cors = require("cors"); // ✅ ADD THIS
// const app = require("./app");
// const connectDB = require("./config/db");

// connectDB();

// // ✅ ADD THIS (VERY IMPORTANT)
// app.use(cors({
//   origin: "*"
// }));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// serve uploads
app.use("/uploads", express.static("uploads"));

app.use("/api/video", require("./routes/video.routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);