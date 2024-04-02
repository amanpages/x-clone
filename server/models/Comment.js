const mongoose = require("mongoose");

// comment schema
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please give content to publish your comment"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    // user who done the comment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
