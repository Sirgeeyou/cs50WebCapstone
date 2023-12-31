import { Link } from "react-router-dom";
import { Logout } from "./Logout";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const username = useSelector((state: any) => state.user.value.username);
  const isUsernameAvailable = Boolean(username);
  console.log("Navbar username: ", username);
  const renderAuthLinks = () => {
    if (isUsernameAvailable) {
      // User is logged in, show favorites and logout links
      return (
        <>
          <li className="text-xl">
            <Link to="/hotels"> Explore </Link>
          </li>
          <li className="text-xl">
            <Link to="/favorites"> Favorites </Link>
          </li>
          <li className="text-xl">
            <Link to="/logout">
              <Logout />
            </Link>
          </li>
        </>
      );
    } else {
      // User is not logged in, show register and login links
      return (
        <>
          <li className="text-xl">
            <Link to="/register"> Register </Link>
          </li>
          <li className="text-xl">
            <Link to="/login"> Login </Link>
          </li>
        </>
      );
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-2xl">
          <Link to="/"> TravelSome </Link>
        </a>
      </div>
      <div className="flex-none"></div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-5 z-50">
          {isUsernameAvailable ? (
            <p className="text-xl pr-5 pt-2.5"> Hello there, {username}! </p>
          ) : (
            <p className="text-xl pr-5 pt-2.5">Hello there!</p>
          )}
          <li>
            <details>
              <summary className="text-2xl">Menu</summary>
              <ul className="p-1 bg-base-100">
                <li className="text-xl">
                  <Link to="/"> Home </Link>
                </li>
                {renderAuthLinks()}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};
