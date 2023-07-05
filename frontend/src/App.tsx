import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Logout } from "./components/Logout";
import { Provider } from "react-redux";
import { store } from "./pages/store";
import { HotelsFeed } from "./pages/HotelsFeed";
import { HotelDetails } from "./pages/HotelDetails";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Provider store={store}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/hotels" element={<HotelsFeed />} />
              <Route path="/hotels/:hotelId" element={<HotelDetails />} />
            </Routes>
          </Provider>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
