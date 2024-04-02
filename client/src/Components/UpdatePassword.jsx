import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  updatePasswordThunk,
} from "../Redux/Reducers/authReducer";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// for update the password
export default function UpdatePassword() {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(authSelector);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!formData.oldPassword || !formData.newPassword || !confirmPassword) {
        toast.error("Please enter all the values");
        return;
      }

      if (formData.newPassword.length < 8) {
        toast.error("Password length should be atleast 8");
        return;
      }

      if (formData.newPassword !== confirmPassword) {
        toast.error("New Password and Confirm Password Doesn't match");
        return;
      }

      const result = await dispatch(
        updatePasswordThunk({ id: loggedInUser._id, data: formData })
      );
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
      <div className="w-full h-full flex flex-col">
        <div
          className="w-full h-[45px] flex items-center px-2 bg-slate-200 
                        border-b border-slate-400 font-semibold dark:bg-slate-500 dark:text-white"
        >
          Update Password
        </div>

        <div className="w-full h-full mt-2 p-2">
          <form className="w-full h-full p-3" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              value={formData.oldPassword}
              required
              onChange={handleFormData}
              className="border rounded border-slate-400 px-2 
                                w-full h-[7%] my-4 dark:bg-slate-600"
            />

            <input
              type="Password"
              name="newPassword"
              value={formData.newPassword}
              placeholder="New Password"
              required
              onChange={handleFormData}
              className="border rounded border-slate-400 px-2 
                                w-full h-[7%] my-4 dark:bg-slate-600"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded border-slate-400 px-2 
                                w-full h-[7%] my-4 dark:bg-slate-600"
            />

            <button
              className="w-full h-[7%] mb-0 bg-black 
                                text-white font-semibold rounded-full"
              type="submit"
              onClick={handleSubmit}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
