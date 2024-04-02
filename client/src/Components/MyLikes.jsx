import { useSelector } from "react-redux";
import { postSelector } from "../Redux/Reducers/postReducer";
import SinglePost from "./SinglePost";

function MyLikes() {
  const { likedPosts } = useSelector(postSelector);
  return (
    <>
      {likedPosts.length > 0 ? (
        likedPosts.map((post) => (
          <SinglePost key={post.post._id} post={post.post} />
        ))
      ) : (
        <h1 className="text-center">No Liked Posts</h1>
      )}
    </>
  );
}

export default MyLikes;
