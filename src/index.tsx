import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store.ts";
import { createTheme, ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={createTheme()}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ThemeProvider>
    ; ,
  </StrictMode>
);
