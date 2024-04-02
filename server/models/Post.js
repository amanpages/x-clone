const mongoose = require("mongoose");

// post schema
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please give content to post"],
    },
    // user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // likes on post
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    // comments on post
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    // image in post
    photo: {
      // photo id in cloudinary
      id: {
        type: String,
      },
      // url from cloudinary
      secure_url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
