import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./pages/store"; // Import the Redux store correctly

import App from "./App";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
