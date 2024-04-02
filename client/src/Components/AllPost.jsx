import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsThunk, postSelector } from "../Redux/Reducers/postReducer";
import Loader from "./Spinner";
import SinglePost from "./SinglePost";
import { toast } from "react-toastify"; // Import toast from react-toastify
import { authSelector } from "../Redux/Reducers/authReducer"; // Assuming you have an auth reducer

const AllPost = () => {
  const dispatch = useDispatch();
  const { allPosts, loading, error } = useSelector(postSelector);
  const { loggedInUser } = useSelector(authSelector); // Assuming loggedInUser is available in your auth state

  useEffect(() => {
    if (loggedInUser) {
      // Only fetch posts if the user is logged in
      dispatch(getAllPostsThunk());
    }
  }, [dispatch, loggedInUser]);

  if (!loggedInUser) {
    return null; // Render nothing if user is not logged in
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    toast.error("Error fetching all posts");
    return null;
  }

  return (
    <div className="h-2/3 w-full p-2 flex flex-col">
      {allPosts.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default AllPost;
