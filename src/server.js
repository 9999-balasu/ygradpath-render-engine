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



// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// require("dotenv").config();

// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());

// // ఇది మెయిన్ URL ఓపెన్ చేసినప్పుడు ఏం జరగాలో చెబుతుంది
// app.get('/', (req, res) => {
//   res.send('Backend విజయవంతంగా పనిచేస్తోంది!');
// });

// // serve uploads
// app.use("/uploads", express.static("uploads"));

// app.use("/api/video", require("./routes/video.routes"));

// //const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );


// // మునుపటి కోడ్ అలాగే ఉంచి, చివరన ఇలా మార్చండి:
// const PORT = process.env.PORT || 10000; // 5000 బదులు 10000 వాడటం మంచిది

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });




// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// require("dotenv").config();

// const app = express();

// // Database Connection
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());




// app.use(cors({
//   origin: "*", // or your Vercel URL
//   methods: ["GET", "POST"],
// }));


// // ✅ ADD HERE 👇
// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ limit: "100mb", extended: true }));
// // Home Route
// app.get('/', (req, res) => {
//   res.send('Backend విజయవంతంగా పనిచేస్తోంది!');
// });

// // Serve uploads
// app.use("/uploads", express.static("uploads"));

// // API Routes
// app.use("/api/video", require("./routes/video.routes"));

// // Port Configuration (ఒక్కసారి మాత్రమే ఉండాలి)
// const PORT = process.env.PORT || 10000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Database Connection
connectDB();

// ✅ Middleware (ONLY ONCE, CLEAN)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Home Route
app.get('/', (req, res) => {
  res.send('Backend విజయవంతంగా పనిచేస్తోంది!');
});

// Serve uploads
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/video", require("./routes/video.routes"));

// Port
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});