import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, updateInfoThunk } from "../Redux/Reducers/authReducer";

// toast notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Spinner";
import { useNavigate } from "react-router-dom";

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

// section to update user's data
export default function UpdateInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser, isLoading } = useSelector(authSelector);
  const { dateOfBirth } = loggedInUser;

  const [formData, setFormData] = useState({
    name: loggedInUser.name,
    email: loggedInUser.email,
    day: dateOfBirth.day,
    year: dateOfBirth.year,
    month: dateOfBirth.month,
    file: "",
  });

  const days = [];
  const years = [];
  const currentYear = new Date().getFullYear();

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

  const handleFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFormData({ ...formData, file: file });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!formData.name || !formData.email) {
        toast.error("Please enter all values");
        return;
      }

      if (!formData.email.includes("@" && ".com")) {
        toast.error("Enter valid email address");
        return;
      }

      if (
        formData.name === loggedInUser.name &&
        formData.email &&
        loggedInUser.email &&
        formData.day === dateOfBirth.day &&
        formData.month === dateOfBirth.month &&
        formData.year === dateOfBirth.year &&
        !formData.file
      ) {
        toast.error("Nothing to Update");
        return;
      }

      const result = await dispatch(
        updateInfoThunk({ id: loggedInUser._id, data: formData })
      );
      if (!result.payload.success) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
        navigate("/home/profile");
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
      <div className="w-full h-full flex flex-col">
        <div
          className="w-full h-[45px] flex items-center px-2 bg-slate-200 
                      border-b border-slate-400 font-semibold dark:bg-slate-500 dark:text-white"
        >
          Update Info
        </div>

        <div className="w-full h-full mt-2 p-2">
          <form className="w-full h-full p-3">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              required
              onChange={handleFormData}
              className="border rounded border-slate-400 px-2 
                              w-full h-[7%] my-4 dark:bg-slate-600"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email address"
              required
              onChange={handleFormData}
              className="border rounded border-slate-400 px-2 
                              w-full h-[7%] my-4 dark:bg-slate-600"
            />

            <div>
              <h1 className="font-bold">Date of birth</h1>
              <p className="leading-tight text-slate-500 text-sm">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </p>
            </div>

            <div className="w-full my-4 h-[10%] py-1">
              <select
                name="month"
                id="month"
                onChange={handleFormData}
                className="w-[45%] h-[90%] border border-slate-400 rounded mx-1 dark:bg-slate-600"
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
                className="w-[20%] h-[90%] border border-slate-400 rounded mx-1 dark:bg-slate-600"
              >
                {days}
              </select>
              <select
                name="year"
                id="year"
                onChange={handleFormData}
                className="w-[25%] h-[90%] border border-slate-400 rounded mx-1 dark:bg-slate-600"
              >
                {years}
              </select>
            </div>

            <h1 className="font-semibold">Profile Picture</h1>
            <div className="w-full h-[12%] rounded border border-slate-400 px-2 my-3 flex items-center">
              <input
                type="file"
                required
                placeholder="image"
                name="photo"
                onChange={handleFile}
                className="dark:bg-slate-600"
              />
            </div>

            <button
              className="w-full h-[7%] mb-0 bg-black 
                              text-white font-semibold rounded-full"
              type="submit"
              onClick={handleSubmit}
            >
              Update Info
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
