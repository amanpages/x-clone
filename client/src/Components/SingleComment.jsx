import { deleteCommentThunk } from "../Redux/Reducers/postReducer";
import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../Redux/Reducers/authReducer";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// render a single comment
export default function SingleComment(props) {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(authSelector);
  const { _id, content, user } = props.comment;

  const deleteComment = async (e) => {
    try {
      e.preventDefault();
      const result = await dispatch(
        deleteCommentThunk({ id: _id, userId: loggedInUser._id })
      );
      if (result.payload.success) {
        toast.success(result.payload.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-auto flex justify-between border-b border-slate-300 px-2 py-1">
        <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
          {user.photo ? (
            <img
              src={user.photo.secure_url}
              alt="avatar"
              className="h-full w-full"
            />
          ) : (
            <img
              src={require("../Assets/icons/dummy-avatar.jpg")}
              alt="avatar"
              className="h-full w-full"
            />
          )}
        </div>
        <div className="w-[85%] h-full flex flex-col dark:text-white">
          {content}
          <small className="font-semibold text-slate-500 dark:text-slate-200">
            {user.name}
          </small>
        </div>

        {loggedInUser._id === user._id ? (
          <div
            className="w-auto h-full cursor-pointer hover:text-red-500 dark:text-slate-300"
            onClick={deleteComment}
          >
            <i class="fa-solid fa-trash"></i>
          </div>
        ) : null}
      </div>
    </>
  );
}
