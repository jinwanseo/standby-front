import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "common/router/index";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./common/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>,
);
