const mongoose = require("mongoose");

// like schema
const likeSchema = new mongoose.Schema(
  {
    // post id
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    // user id
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
