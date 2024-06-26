import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProvideContext } from "./Hooks/ProvideContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProvideContext>
      <App />
    </ProvideContext>
  </React.StrictMode>
);
