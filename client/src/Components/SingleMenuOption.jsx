import { NavLink } from "react-router-dom";

// a single menu options in side navbar
export default function SignleMenuOption(props) {
  const { name, icon, link } = props.menu;

  return (
    <>
      <div
        className="w-full h-[45px] p-1 my-1 text-xl flex justify-center 
                    lg:justify-start items-center hover:bg-[#f7f5f5] hover:rounded hover:shadow-md 
                    dark:hover:bg-slate-300 dark:hover:text-black"
      >
        <NavLink
          style={({ isActive }) =>
            isActive ? { fontWeight: "bold" } : undefined
          }
          to={link}
        >
          <span>{icon}</span>
          &nbsp;
          <span className="hidden lg:inline">{name}</span>
        </NavLink>
      </div>
    </>
  );
}
