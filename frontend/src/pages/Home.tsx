import { useSelector } from "react-redux";

export const Home = () => {
  const username = useSelector((state: any) => state.user.value.username);
  const isUsernameAvailable = Boolean(username);

  return (
    <div>
      {isUsernameAvailable ? (
        <h1>This is the homepage, welcome {username}!</h1>
      ) : (
        <h1>No username found</h1>
      )}
    </div>
  );
};
