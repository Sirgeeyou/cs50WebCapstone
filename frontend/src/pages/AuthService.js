import axios from "axios";

const API_URL = "http://localhost:8000/"; // Replace with your Django backend URL

class AuthService {
  login(username, password) {
    return axios
      .post(`${API_URL}/token/`, { username, password })
      .then((response) => {
        console.log("response: ", response);
        if (response.data.access) {
          localStorage.setItem("accessToken", response.data.access);
          const username = response.data.username;
          dispatch(login({ success: true, username }));
        }
        return response; // Return the entire response object
      });
  }

  logout() {
    localStorage.removeItem("accessToken");
  }

  getCurrentUser() {
    const token = localStorage.getItem("accessToken");
    // Decode the token and get user information if needed
    // You can use libraries like jwt-decode for this purpose
  }
}

export default new AuthService();
