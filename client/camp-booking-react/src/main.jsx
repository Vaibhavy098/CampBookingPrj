import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";
import "./assets/styles/index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    {/* <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "12px",
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          iconTheme: { primary: "#059669", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#dc2626", secondary: "#fff" },
        },
      }}
    /> */}
    <Toaster
      position="top-right"
      gutter={12}
      reverseOrder={false}
      containerStyle={{
        top: 24,
        right: 24,
      }}
      toastOptions={{
        duration: 4000,

        style: {
          minWidth: "380px",
          maxWidth: "420px",
          padding: "16px 20px",
          borderRadius: "16px",
          fontSize: "15px",
          fontWeight: "500",
          boxShadow: "0 20px 50px rgba(0,0,0,.15)",
        },

        success: {
          iconTheme: {
            primary: "#059669",
            secondary: "#ffffff",
          },
        },

        error: {
          iconTheme: {
            primary: "#DC2626",
            secondary: "#ffffff",
          },
        },
      }}
    />
  </Provider>,
);
