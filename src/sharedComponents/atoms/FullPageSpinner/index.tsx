import { Box, CircularProgress } from "@mui/material";
import { NAVBAR_HEIGHT } from "../../../constants";

const FullPageSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <CircularProgress size="6rem" />
    </Box>
  );
};

export default FullPageSpinner;
