import { Box } from "@mui/material";
import { ReactFCC } from "../../../model";
import Navbar from "../Navbar";
import BackToTopButton from "../../atoms/ReturnToStartButton";

const DefaultLayout: ReactFCC = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {children}
      <BackToTopButton />
    </Box>
  );
};

export default DefaultLayout;
