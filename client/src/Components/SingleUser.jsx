import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authSelector,
  getIFollowThunk,
  setUserProfile,
  toggelFollowThunk,
} from "../Redux/Reducers/authReducer";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// render a single user in suggestion list
export default function SingleUser(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { follows } = useSelector(authSelector);
  const { name, email, _id, photo } = props.user;
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    dispatch(getIFollowThunk());
    for (let index = 0; index < follows.length; index++) {
      if (follows[index]._id === _id) {
        setFollowing(true);
        break;
      }
    }
  }, [follows]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setUserProfile(props.user));
    navigate("/home/userprofile");
  };

  const handleFollowClick = async (e) => {
    try {
      e.preventDefault();
      const result = await dispatch(toggelFollowThunk({ userId: _id }));
      setFollowing(!following);
      if (!result.payload.success) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full p-1 h-[50px] my-1 flex justify-between">
        <div
          className="w-[42px] h-full rounded-full overflow-hidden cursor-pointer"
          onClick={handleClick}
        >
          {photo ? (
            <img
              src={photo.secure_url}
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

        <div className="w-[50%] px-1 h-full flex flex-col justify-start">
          <span className="font-semibold cursor-pointer" onClick={handleClick}>
            {name}
          </span>
          <span className="text-sm text-slate-500 dark:text-white">
            {email}
          </span>
        </div>

        <div className="w-auto  h-full flex justify-center items-center">
          <button
            className="rounded-full px-2 py-[2px] bg-black 
                                text-white text-sm font-semibold shadow-md"
            onClick={handleFollowClick}
          >
            {following ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </>
  );
}
