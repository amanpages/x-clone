import React from "react";
import { useSelector } from "react-redux";
import { postSelector } from "../Redux/Reducers/postReducer";
import SinglePost from "./SinglePost";

function MyComments() {
  const { commentedPosts } = useSelector(postSelector);

  return (
    <>
      {commentedPosts.length > 0 ? (
        commentedPosts.map((post) => (
          <SinglePost key={post.post._id} post={post.post} />
        ))
      ) : (
        <h1 className="text-center">No Comments on Posts</h1>
      )}
    </>
  );
}

export default MyComments;
