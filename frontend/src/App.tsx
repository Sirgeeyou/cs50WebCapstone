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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./pages/store";

function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();

  // Retrieve user information from local storage during initial rendering
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(login({ success: true, username: user.username }));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<HotelsFeed />} />
            <Route path="/hotels/:hotelId" element={<HotelDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
