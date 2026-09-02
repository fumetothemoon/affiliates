import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { FluentProvider } from "@fluentui/react-components";
import App from "./App";
import { chromeDarkTheme } from "./theme.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FluentProvider
      theme={chromeDarkTheme}
      style={{ background: "transparent" }}
    >
      <App />
    </FluentProvider>
  </StrictMode>,
);
