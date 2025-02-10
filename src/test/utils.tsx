import * as React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {ui}
        </LocalizationProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
};
