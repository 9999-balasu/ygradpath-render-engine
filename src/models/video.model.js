// const mongoose = require("mongoose");

// const videoSchema = new mongoose.Schema(
//   {
//     url: String,
//     public_id: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Video", videoSchema);



const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);