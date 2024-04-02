import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  signOutThunk,
  getLoggedInUserThunk,
} from "../Redux/Reducers/authReducer";
import SignleMenuOption from "./SingleMenuOption";
import Loader from "./Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser, isLoading } = useSelector(authSelector);
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const menuOptions = [
    {
      name: "Home",
      icon: <i className="fa-solid fa-house"></i>,
      link: "/home",
    },
    {
      name: "Explore",
      icon: <i className="fa-solid fa-magnifying-glass"></i>,
      link: "/home/explore",
    },
    {
      name: "Profile",
      icon: <i className="fa-solid fa-user"></i>,
      link: "/home/profile",
    },
    {
      name: "Settings",
      icon: <i className="fa-solid fa-gears"></i>,
      link: "/home/settings",
    },
  ];

  useEffect(() => {
    dispatch(getLoggedInUserThunk());
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signOutThunk());
      if (result.payload.success) {
        toast.success(result.payload.message);
        navigate("/");
      } else {
        toast.error(result.payload.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.classList = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="w-screen h-screen flex md:px-[1%] lg:px-[5%] py-[1%] justify-center overflow-y-scroll dark:bg-slate-800 dark:text-white">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="h-full w-full xl:w-4/5 flex justify-between relative">
            <div className="w-full bg-slate-200 opacity-100 md:bg-white md:w-[6%] fixed bottom-0 left-0 md:static lg:w-[21%] h-fit md:h-full text-black shadow rounded p-1 md:p-2 flex flex-row md:flex-col dark:bg-slate-500 dark:text-slate-200">
              <div className="hidden md:block w-full h-[35px] my-1">
                <NavLink to="/home">
                  <img
                    src={require("../Assets/logo.png")}
                    alt="logo"
                    className="h-full w-auto"
                  />
                </NavLink>
              </div>

              <div className="w-full h-fit md:h-full flex flex-row md:flex-col justify-between items-center">
                <div className="w-4/5 md:w-full h-auto my-2 flex flex-row justify-between md:flex-col">
                  {menuOptions.map((menu, i) => (
                    <SignleMenuOption key={i} menu={menu} />
                  ))}
                </div>

                <div className="w-1/5 md:w-full h-[45px] my-2 md:bg-[#f7f5f5] rounded md:shadow-md flex items-center justify-between p-1 text-xl font-semibold relative dark:md:bg-slate-200 dark:hover:bg-slate-200">
                  <div className="hidden w-[37px] h-full rounded-full overflow-hidden lg:block">
                    {loggedInUser && loggedInUser.photo ? (
                      <img
                        src={loggedInUser.photo.secure_url}
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

                  <div className="hidden w-3/5 h-full lg:block dark:text-black">
                    {loggedInUser && loggedInUser.name}
                  </div>

                  <div
                    className="w-full lg:w-1/5 h-full rounded-full cursor-pointer flex justify-center items-center hover:bg-slate-200 dark:text-white dark:md:text-black dark:hover:text-black"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <span>
                      {showMenu ? (
                        <i className="fa-solid fa-xmark"></i>
                      ) : (
                        <i className="fa-solid fa-ellipsis"></i>
                      )}
                    </span>

                    {showMenu ? (
                      <div
                        className="absolute bg-slate-200 bottom-11 w-[190px] lg:w-full h-[45px] rounded flex items-center right-2 md:left-0 shadow-md text-base p-1 px-2 cursor-pointer"
                        onClick={handleSignOut}
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </span>
                        &nbsp;
                        <span>
                          Log out @{loggedInUser && loggedInUser.name}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <Outlet />
            <div
              className={`${
                darkMode ? "bg-white text-slate-800" : "bg-slate-800 text-white"
              } fixed top-3 md:bottom-[10px] right-2 md:right-5 rounded-full h-[45px] sm:right-10 w-[45px] flex justify-center items-center shadow-md text-lg cursor-pointer`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <i className="fa-solid fa-cloud-sun"></i>
              ) : (
                <i className="fa-solid fa-cloud-moon"></i>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
