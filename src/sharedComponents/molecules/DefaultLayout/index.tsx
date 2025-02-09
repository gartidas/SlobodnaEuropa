import { Box } from "@mui/material";
import { ReactFCCWithProps } from "../../../model";
import Navbar from "../Navbar";
import BackToTopButton from "../../atoms/ReturnToStartButton";

interface IDefaultLayoutProps {
  isFabVisible?: boolean;
}

const DefaultLayout: ReactFCCWithProps<IDefaultLayoutProps> = ({
  isFabVisible,
  children,
}) => {
  return (
    <Box>
      <Navbar />
      {children}
      {isFabVisible && <BackToTopButton />}
    </Box>
  );
};

export default DefaultLayout;
