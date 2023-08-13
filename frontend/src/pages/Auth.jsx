import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const username = useSelector((state) => state.user.value.username);
  console.log("username: ", username);
  const isUsernameAvailable = Boolean(username);
  // If not authenticated, render the Navigate component to redirect to login
  if (!isUsernameAvailable) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children components
  return children;
};

export default Auth;
