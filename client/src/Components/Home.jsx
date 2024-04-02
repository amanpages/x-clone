import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostThunk } from "../Redux/Reducers/postReducer";
import { authSelector } from "../Redux/Reducers/authReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./SideBar";
import AllPost from "./AllPost";
import FollowingPost from "./FollowingPost";
import Loader from "./Spinner";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser, isLoading } = useSelector(authSelector);
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showFollowPost, setShowFollowPost] = useState(false);

  useEffect(() => {
    document.title = "Home | Twitter";
  }, []);

  const handlePostSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!content || !content.trim()) {
        toast.error("Please enter some data");
        setContent("");
        return;
      }

      const result = await dispatch(
        addPostThunk({ content, userId: loggedInUser?._id, file })
      );

      if (result.payload.success) {
        toast.success(result.payload.message);
        setContent("");
        setFile("");
        setImagePreview(null);
      } else {
        toast.error(result.payload.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="h-full w-full px-1 md:px-0 md:w-[90%] lg:w-[78%] flex justify-between">
      <div className="w-full md:w-[68%] p-2 rounded flex flex-col">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header className="w-full h-1/5 p-2">
              <div className="w-full h-full">
                <div className="font-bold text-2xl w-full h-3/5">Home</div>
                <div className="w-full h-2/5 flex font-semibold border-b">
                  <div
                    style={
                      showFollowPost
                        ? null
                        : {
                            textDecoration: "underline",
                            textDecorationColor: "skyblue",
                            textDecorationThickness: "4px",
                          }
                    }
                    className="w-1/2 h-full flex items-center justify-center border-r cursor-pointer decoration-sky-500 underline-offset-8 "
                    onClick={() => setShowFollowPost(false)}
                  >
                    For You
                  </div>
                  <div
                    style={
                      showFollowPost
                        ? {
                            textDecoration: "underline",
                            textDecorationColor: "skyblue",
                            textDecorationThickness: "4px",
                          }
                        : null
                    }
                    className="w-1/2 h-full flex items-center justify-center cursor-pointer underline-offset-8"
                    onClick={() => setShowFollowPost(true)}
                  >
                    Following
                  </div>
                </div>
              </div>
            </header>
            <div className="w-full h-1/5 flex border-b p-2">
              <div className="w-[55px] h-[55px] overflow-hidden rounded-full mr-1">
                {loggedInUser?.photo ? (
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
              <div className="h-full w-[88%] p-1 relative">
                <form className="w-full h-full relative">
                  {imagePreview && (
                    <div className="absolute top-0 right-0 flex items-center space-x-2">
                      <img
                        src={imagePreview}
                        alt="Image preview"
                        className="w-16 h-16 object-cover border border-gray-300"
                      />
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setFile(null);
                          setImagePreview(null);
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  )}
                  <textarea
                    className="w-full h-[65%] focus:outline-none p-1 font-semibold text-xl rounded-sm dark:bg-slate-600"
                    placeholder="What is happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="image"
                    className="text-sky-400 hover:text-sky-600 text-xl cursor-pointer"
                  >
                    <i className="fa-solid fa-image"></i>
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => handleFileChange(e)}
                    placeholder="picture"
                    className="hidden"
                  />
                  <button
                    className="float-right px-3 py-1 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold"
                    onClick={handlePostSubmit}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
            {showFollowPost ? <FollowingPost /> : <AllPost />}
          </>
        )}
      </div>
      <SideBar parent={"home"} />
    </div>
  );
}
