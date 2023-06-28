import { Link } from "react-router-dom";
import { Logout } from "../pages/Logout";

export const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">
        <Logout />
      </Link>
    </div>
  );
};
