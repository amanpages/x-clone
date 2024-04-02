import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../Components/SideBar";
import { authSelector } from "../Redux/Reducers/authReducer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggelFollowThunk } from "../Redux/Reducers/authReducer";
import {
  getMyCommentThunk,
  getMyLikeThunk,
  getMyPostThunk,
} from "../Redux/Reducers/postReducer";
import SinglePost from "../Components/SinglePost";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postSelector } from "../Redux/Reducers/postReducer";

// for showing profile of a user
export default function UserProfile() {
  const dispatch = useDispatch();
  const { loggedInUser, userProfile } = useSelector(authSelector);
  const { userPosts } = useSelector(postSelector);
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    document.title = `${userProfile.name} | Profile`;
  }, []);

  useEffect(() => {
    if (!userProfile) {
      navigate(-1);
    }

    async function getPost() {
      await dispatch(getMyPostThunk(userProfile._id));
      await dispatch(getMyLikeThunk(userProfile._id));
      await dispatch(getMyCommentThunk(userProfile._id));
    }
    getPost();
  }, [userProfile]);

  const handleFollowClick = async (e) => {
    try {
      e.preventDefault();
      const result = await dispatch(
        toggelFollowThunk({ id: loggedInUser._id, userId: userProfile._id })
      );
      if (!result.payload.success) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="h-full w-[90%] lg:w-[78%] flex justify-between">
      <div className="w-full md:w-[68%] h-full rounded flex flex-col">
        <div className="w-full h-[45px] px-2 flex items-center shadow shrink-0">
          <span className="font-semibold">{userProfile.name}</span>
        </div>

        <div className="w-full h-full flex flex-col">
          <div className="w-full h-3/5 flex flex-col justify-between">
            <div className="w-full h-3/5 relative">
              <div className="w-full h-3/4 bg-slate-200 border-b-4 border-white"></div>

              <div className="w-full h-1/4 ">
                <button
                  className="float-right px-2 py-1 mt-2 mr-2 border border-slate-400 rounded-full"
                  onClick={handleFollowClick}
                >
                  Follow
                </button>
              </div>
              <div className="h-1/2 w-[22%] top-[50%] left-3 absolute bg-red-950 rounded-full border-4 border-white overflow-hidden">
                {userProfile.photo ? (
                  <img
                    src={userProfile.photo.secure_url}
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
            </div>

            <div className="w-full h-1/4 px-3">
              <h1 className="font-bold text-xl">{userProfile.name}</h1>
              <small className="font-semibold text-slate-400 text-base">
                {userProfile.email}
              </small>
              <p className="font-semibold text-slate-400">
                <i class="fa-solid fa-calendar-days"></i>
                &nbsp; Joined On:
                {userProfile.createdAt.slice(0, 10)}
              </p>
              <div className="w-full h-auto flex">
                <div className="mx-2">
                  <p className="text-slate-400">
                    <span className="font-semibold text-black dark:text-white">
                      {userProfile.followers.length}
                    </span>
                    &nbsp; followers
                  </p>
                </div>

                <div className="mx-2">
                  <p className="text-slate-400">
                    <span className="font-semibold text-black dark:text-white">
                      {userProfile.follows.length}
                    </span>
                    &nbsp; following
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[10%] border-b border-slate-400 flex items-center justify-between font-semibold">
              <div className="w-1/3 flex justify-center items-center border-r border-slate-300">
                <NavLink
                  to="/home/userprofile/"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          textDecoration: "underline",
                          textDecorationColor: "skyblue",
                          textDecorationThickness: "4px",
                        }
                      : undefined
                  }
                  className="underline-offset-8"
                >
                  Posts
                </NavLink>
              </div>
              <div className="w-1/3 flex justify-center items-center border-r border-slate-300">
                <NavLink
                  to="/home/userprofile/likes"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          textDecoration: "underline",
                          textDecorationColor: "skyblue",
                          textDecorationThickness: "4px",
                        }
                      : undefined
                  }
                  className="underline-offset-8"
                >
                  Likes
                </NavLink>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                <NavLink
                  to="/home/userprofile/comments"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          textDecoration: "underline",
                          textDecorationColor: "skyblue",
                          textDecorationThickness: "4px",
                        }
                      : undefined
                  }
                  className="underline-offset-8"
                >
                  Comments
                </NavLink>
              </div>
            </div>
          </div>

          <div className="w-full h-2/5 p-2">
            <Outlet />
          </div>
        </div>
      </div>

      <SideBar parent={"home"} />
    </div>
  );
}
