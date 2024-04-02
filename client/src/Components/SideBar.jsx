import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, getAllUserThunk } from "../Redux/Reducers/authReducer";
import SingleUser from "./SingleUser";

const SideBar = ({ parent }) => {
  const dispatch = useDispatch();
  const { allUsers, loggedInUser, follows, followers } =
    useSelector(authSelector);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(getAllUserThunk());
    }
  }, [dispatch, loggedInUser]);

  if (!loggedInUser) {
    return null;
  }

  return (
    <div className="hidden w-[35%] p-2 rounded md:flex flex-col">
      <div className="w-full flex flex-col p-1 rounded shadow-sm bg-[#f7f5f5] mb-3 h-2/5 overflow-y-scroll relative dark:bg-slate-500">
        <h1 className="font-bold text-lg p-2">
          {parent === "home" ? "Who to follow" : "People You Follow"}
        </h1>
        {parent === "home"
          ? allUsers.map(
              (user) =>
                user._id !== loggedInUser._id && (
                  <SingleUser key={user._id} user={user} parent={"home"} />
                )
            )
          : follows.map((user) => (
              <SingleUser key={user._id} user={user} parent={"profile"} />
            ))}
      </div>

      {parent !== "home" && (
        <div className="w-full flex flex-col p-1 rounded shadow-sm bg-[#f7f5f5] mb-3 h-2/5 overflow-y-scroll relative dark:bg-slate-500">
          <h1 className="font-bold text-lg p-2 sticky z-20">
            People following You
          </h1>
          {followers.map((user) => (
            <SingleUser key={user._id} user={user} parent={"profile"} />
          ))}
        </div>
      )}

      <div className="w-full h-1/5 flex flex-col rounded p-1 shadow-sm bg-[#f7f5f5] dark:bg-slate-500">
        <h1 className="font-bold text-lg p-2">Sponsored</h1>
        <div className="w-full h-[65%]">
          <img
            src={require("../Assets/icons/ad.jpg")}
            alt="ad"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
