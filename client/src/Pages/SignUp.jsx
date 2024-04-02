import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authSelector, signUpThunk } from "../Redux/Reducers/authReducer";
import Loader from "../Components/Spinner";

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// create a new account of user
export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    day: "1",
    year: "2023",
    month: "January",
    password: "",
    file: "",
  });

  const { isLoading } = useSelector(authSelector);

  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const [isNextClicked, setIsNextClicked] = useState(false);

  const days = [];
  const years = [];
  const currentYear = new Date().getFullYear();

  const fileData = new FormData();

  useEffect(() => {
    document.title = "Sign Up | Twitter";
  }, []);

  if (formData.month === "February") {
    for (let i = 1; i <= 29; i++) {
      days.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
  } else if (
    ["April", "June", "September", "November"].includes(formData.month)
  ) {
    for (let i = 1; i <= 30; i++) {
      days.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
  } else {
    for (let i = 1; i <= 31; i++) {
      days.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
  }

  for (let i = 0; i < 75; i++) {
    years.push(
      <option value={currentYear - i} key={i}>
        {currentYear - i}
      </option>
    );
  }

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleNextButton = (e) => {
    e.preventDefault();

    if (!isNextClicked) {
      if (!formData.name || !formData.email) {
        toast.error("Please enter all values");
        return;
      }

      if (!formData.email.includes("@" && ".com")) {
        toast.error("Enter valid email address");
        return;
      }

      setIsNextClicked(true);
    }
  };

  const handleFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFormData({ ...formData, file: file });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!formData.password || formData.password.length < 8) {
        toast.error("Please enter a password with atleast 8 characters");
        return;
      }

      if (formData.password !== confirmPassword) {
        toast.error("Password and confirm password doesn't match");
        return;
      }

      const result = await dispatch(signUpThunk(formData));

      if (!result.payload.success) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
        navigate("/signin");
      }
      setIsNextClicked(false);
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
            <button className=" w-[25px] rounded-full hover:bg-gray-300 transition ease-in-out">
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
          <div className="flex w-2/3 h-full flex-col justify-around">
            <div className="text-3xl w-full font-semibold">
              Create your account
            </div>

            <div className="w-full h-full">
              <form className="w-full h-full p-3">
                {!isNextClicked ? (
                  <>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      required
                      onChange={handleFormData}
                      className="border rounded border-slate-400 px-2 
                                    w-full h-[12%] my-4 dark:bg-slate-300 dark:text-black"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Email address"
                      required
                      onChange={handleFormData}
                      className="border rounded border-slate-400 px-2 
                                    w-full h-[12%] my-4 dark:bg-slate-300 dark:text-black"
                    />

                    <div>
                      <h1 className="font-bold">Date of birth</h1>
                      <p className="leading-tight text-slate-500 text-sm dark:text-white">
                        This will not be shown publicly. Confirm your own age,
                        even if this account is for a business, a pet, or
                        something else.
                      </p>
                    </div>

                    <div className="w-full my-4 h-[15%] py-1">
                      <select
                        name="month"
                        id="month"
                        onChange={handleFormData}
                        className="w-[45%] h-[90%] border border-slate-400 rounded mx-1 dark:bg-slate-300 dark:text-black"
                      >
                        {monthName.map((month, i) => (
                          <option value={month} key={i}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        name="day"
                        id="day"
                        onChange={handleFormData}
                        className="w-[20%] h-[90%] border border-slate-400 rounded mx-1 dark:bg-slate-300 dark:text-black"
                      >
                        {days}
                      </select>
                      <select
                        name="year"
                        id="year"
                        onChange={handleFormData}
                        className="w-[25%] h-[90%] border border-slate-400 rounded mx-1 dark:bg-slate-300 dark:text-black"
                      >
                        {years}
                      </select>
                    </div>

                    <button
                      className="w-full h-[10%] mb-0 bg-black 
                                    text-white font-semibold rounded-full"
                      onClick={handleNextButton}
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <>
                    <h1 className="font-semibold">Profile Picture</h1>
                    <div className="w-full h-[12%] rounded border border-slate-400 px-2 my-3 flex items-center">
                      <input
                        type="file"
                        required
                        placeholder="image"
                        name="photo"
                        onChange={handleFile}
                        className="dark:bg-slate-300 dark:text-black"
                      />
                    </div>

                    <input
                      type="password"
                      value={formData.password}
                      placeholder="Password"
                      required
                      name="password"
                      onChange={handleFormData}
                      className="border rounded border-slate-400 px-2 
                                    w-full h-[12%] my-3 dark:bg-slate-300 dark:text-black"
                    />

                    <input
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border rounded border-slate-400 px-2 
                                    w-full h-[12%] my-3 dark:bg-slate-300 dark:text-black"
                    />

                    <button
                      className="w-full h-[10%] mb-0 bg-black 
                                    text-white font-semibold rounded-full"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Create your account
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
