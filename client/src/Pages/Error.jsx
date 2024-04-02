import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// render error page
export default function Error() {
  const navigate = useNavigate();

  // redirect to homepage after 3 second
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    // Error message on screen
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">Error, Something went wrong !!!</h1>
      <br />
      <p>redirecting back to homepage... </p>
    </div>
  );
}
