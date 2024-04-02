import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getFollowPostThunk,
  postSelector,
} from "../Redux/Reducers/postReducer";
import { authSelector } from "../Redux/Reducers/authReducer";

import Loader from "./Spinner";

import SinglePost from "./SinglePost";

// show post of person user follows

export default function FollowingPost() {
  const dispatch = useDispatch();
  const { loggedInUser, isLoading } = useSelector(authSelector);
  const { followPosts, loading } = useSelector(postSelector);

  useEffect(() => {
    async function getPost() {
      dispatch(getFollowPostThunk(loggedInUser._id));
    }
    getPost();
  }, []);

  return (
    <>
      <div className="h-2/3 w-full p-2 flex flex-col">
        {loading || isLoading ? (
          <Loader />
        ) : (
          followPosts.map((post) => <SinglePost key={post._id} post={post} />)
        )}
      </div>
    </>
  );
}
