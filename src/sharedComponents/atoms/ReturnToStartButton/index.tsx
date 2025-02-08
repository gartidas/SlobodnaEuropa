import * as React from "react";
import { Fab, useMediaQuery, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BackToTopButton = () => {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (buttonRef.current) {
        if (window.scrollY > 300) {
          buttonRef.current.style.opacity = "1";
          buttonRef.current.style.visibility = "visible";
        } else {
          buttonRef.current.style.opacity = "0";
          buttonRef.current.style.visibility = "hidden";
        }
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fab
      ref={buttonRef}
      color="primary"
      size="medium"
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: isMobile ? "0.5rem" : "2rem",
        right: isMobile ? "0.25rem" : "2rem",
        opacity: 0,
        visibility: "hidden",
        transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",

        "&:hover": {
          backgroundColor: "#1976d2",
        },
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default BackToTopButton;
