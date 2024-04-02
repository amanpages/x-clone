import { Outlet } from "react-router-dom";
import SignleMenuOption from "../Components/SingleMenuOption";
import { useEffect } from "react";

// section of settings
export default function Settings() {
  const menuOptions = [
    {
      name: "Update Info",
      icon: <i class="fa-solid fa-pen-to-square"></i>,
      link: "/home/settings/",
    },
    {
      name: "Update Password",
      icon: <i class="fa-solid fa-key"></i>,
      link: "/home/settings/updatepassword",
    },
    {
      name: "Delete Account",
      icon: <i class="fa-solid fa-trash"></i>,
      link: "/home/settings/deleteaccount",
    },
    {
      name: "About",
      icon: <i class="fa-solid fa-circle-info"></i>,
      link: "/home/settings/about",
    },
  ];

  useEffect(() => {
    document.title = "Settings | Twitter";
  }, []);

  return (
    <div className="h-full w-full px-1 md:px-0 md:w-[90%] lg:w-[78%] flex justify-between items-center">
      <div className="w-[10%] lg:w-[30%] h-full shadow-sm">
        <div className="text-xl font-bold w-full h-[45px] mt-2 p-1 border-b border-slate-300">
          <span className="hidden lg:block">Settings</span>

          <span className="lg:hidden text-center">
            <i class="fa-solid fa-gears"></i>
          </span>
        </div>
        <div className="flex flex-col justify-between">
          {menuOptions.map((menu, i) => (
            <SignleMenuOption key={i} menu={menu} />
          ))}
        </div>
      </div>
      <div className="w-full lg:w-2/3 h-full rounded">
        <Outlet />
      </div>
    </div>
  );
}
