import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../pages/store";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const endpoint = "http://127.0.0.1:8000/logout/";
      const response = await Axios.post(endpoint);
      console.log("Logout successful: ", response.data);
      // Perform any additional actions after successful logout, e.g., redirecting to the login page
      localStorage.removeItem("loggedInUser");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return <button onClick={logoutUser}>Logout</button>;
};
