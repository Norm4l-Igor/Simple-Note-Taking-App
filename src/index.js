import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; 
import "./styles/global.css"; 
import "./styles/Login.css";
import "./styles/Header.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
