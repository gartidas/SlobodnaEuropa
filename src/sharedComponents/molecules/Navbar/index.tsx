import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { NAVBAR_HEIGHT } from "../../../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const navbarRef = React.useRef<HTMLDivElement | null>(null);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (navbarRef.current) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          navbarRef.current.style.transform = "translateY(-100%)";
        } else {
          navbarRef.current.style.transform = "translateY(0)";
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      ref={navbarRef}
      sx={{
        top: 0,
        zIndex: 1000,
        backgroundColor: "#fff",
        padding: "0.75rem 1.5rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
        height: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          padding: "0 !important",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "#000",
            "&:hover": { opacity: 0.8 },
          }}
          onClick={() => navigate("/articles")}
        >
          Articles
        </Typography>

        <IconButton
          sx={{
            borderRadius: "999px",
            padding: "0.5rem 1.25rem",
            transition: "all 0.3s ease-in-out",

            "&:hover": { backgroundColor: "#f5f5f5", transform: "scale(1.05)" },
          }}
        >
          <MenuIcon sx={{ color: "#000" }} />
          <Avatar
            sx={{
              width: "2rem",
              height: "2rem",
              marginLeft: "0.75rem",
              backgroundColor: "#757575",
            }}
          />
        </IconButton>

        {/* NOTE: Menu placement */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
