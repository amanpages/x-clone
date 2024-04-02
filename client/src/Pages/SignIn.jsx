import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

// toast notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  authSelector,
  setLoggedInUser,
  signInThunk,
} from "../Redux/Reducers/authReducer";
import Loader from "../Components/Spinner";

// for signin the user
export default function SignIn() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(authSelector);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Sign In | X";
  }, []);

  const navigate = useNavigate();

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!formData.email || !formData.password) {
        toast.error("Please enter password");
        return;
      }

      if (!formData.email.includes("@" && ".com")) {
        toast.error("Enter valid email address");
        return;
      }

      const result = await dispatch(signInThunk(formData));
      if (!result.payload.success) {
        toast.error(result.payload.message);
      } else {
        navigate("/home");
        toast.success(result.payload.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className="absolute bg-slate-200 opacity-50 p-2 h-full w-full 
                            rounded shadow-md flex justify-center items-center"
      ></div>
      <div
        className="absolute bg-white h-full md:h-4/5 w-full md:w-3/5 lg:w-2/5 p-2 
                            rounded-md shadow-md flex flex-col justify-between dark:bg-slate-600"
      >
        <div className="w-full h-[7%] flex">
          <NavLink to="/">
            <button className=" w-[25px] rounded-full hover:bg-gray-300 transition ease-in-out dark:hover:text-black">
              X
            </button>
          </NavLink>
          <div
            className="h-full w-full flex justify-center 
                                    items-center"
          >
            <img
              src={require("../Assets/logo.png")}
              alt="logo"
              className="h-full w-auto"
            />
          </div>
        </div>

        <div className="w-full h-[90%] p-2 flex justify-center items-center">
          <div className="flex w-full sm:w-2/3 h-full flex-col justify-around">
            <div className="text-3xl w-full font-semibold">Sign in to X</div>

            <div className=" w-full h-full flex flex-col py-3 my-3 items-start">

              <div className="w-full h-[45%] ">
                <form className="w-full h-full p-3" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    required
                    onChange={handleFormData}
                    className="border rounded border-slate-400 px-2 
                            w-full h-[30%] mb-2 dark:bg-slate-300 dark:text-black"
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    required
                    onChange={handleFormData}
                    className="border rounded border-slate-400 px-2 
                            w-full h-[30%] mb-2 dark:bg-slate-300 text-black"
                  />

                  <button
                    className="w-full h-1/4 mb-0 bg-black text-white 
                            font-semibold rounded-full"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </button>
                </form>
              </div>
              
              <p className="font-bold pl-1">
                Don't have an Account?
                <a href="/signup" className="text-sky-400">
                  {" "}
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
