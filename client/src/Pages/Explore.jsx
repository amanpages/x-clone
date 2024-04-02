import { useSelector } from "react-redux";
import { authSelector } from "../Redux/Reducers/authReducer";
import SingleUser from "../Components/SingleUser";
import { useState, useEffect } from "react";

// for the explore section on
export default function Explore() {
  const { allUsers, loggedInUser } = useSelector(authSelector);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Explore | Twitter";
  }, []);

  return (
    <div className="h-full w-full px-1 md:px-0 md:w-[90%] lg:w-[78%] flex justify-between">
      <div className="w-full md:w-[68%] h-full rounded flex flex-col">
        <div className="w-full h-[45px] text-xl font-semibold bg-slate-100 dark:bg-transparent flex items-center px-2 border-b border-slate-300 shadow-sm">
          People You May Know
        </div>

        <div className="w-full h-full p-2 bg-slate-50 flex flex-col dark:bg-transparent">
          <div className="w-full h-auto px-2 my-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border w-full rounded-full 
                                h-[35px] mt-1 px-3 focus:outline-none"
            />
          </div>

          {allUsers
            .filter((user) => {
              return search.toLocaleLowerCase() === ""
                ? user
                : user.name.toLocaleLowerCase().includes(search);
            })
            .map((user) =>
              user._id !== loggedInUser._id ? (
                <SingleUser key={user._id} user={user} />
              ) : null
            )}
        </div>
      </div>
    </div>
  );
}
