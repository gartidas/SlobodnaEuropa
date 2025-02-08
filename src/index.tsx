import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import store from "./store";
import GlobalStyles from "./GlobalStyles.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={createTheme()}>
      <ReduxProvider store={store}>
        <GlobalStyles />
        <App />
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>
);
