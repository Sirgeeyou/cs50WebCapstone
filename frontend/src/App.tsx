// App.tsx

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Logout } from "./components/Logout";
import { HotelsFeed } from "./pages/HotelsFeed";
import { HotelDetails } from "./pages/HotelDetails";
import { Favorites } from "./pages/Favorites";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./pages/store";
import Auth from "./pages/Auth";

function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  // Retrieve user information from local storage during initial rendering
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(login({ success: true, username: user.username }));
    }
    setIsAuthInitialized(true);
  }, [dispatch]);

  if (!isAuthInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/hotels/:hotelId"
              element={
                <Auth>
                  <HotelDetails />
                </Auth>
              }
            />
            <Route
              path="/favorites"
              element={
                <Auth>
                  <Favorites />
                </Auth>
              }
            />
            <Route
              path="/logout"
              element={
                <Auth>
                  <Logout />
                </Auth>
              }
            />
            <Route
              path="/hotels"
              element={
                <Auth>
                  <HotelsFeed />
                </Auth>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
