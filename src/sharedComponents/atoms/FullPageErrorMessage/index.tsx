import { Box, Paper, Typography } from "@mui/material";
import { NAVBAR_HEIGHT } from "../../../constants";

interface IFullPageErrorMessageProps {
  errorMessage: string;
}

const FullPageErrorMessage = ({ errorMessage }: IFullPageErrorMessageProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `calc(100vh - ${NAVBAR_HEIGHT}px - 2rem)`,
        padding: "1rem",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "3rem 8rem",
          borderRadius: "1rem",
          backgroundColor: "#ffebee",
          border: "2px solid #d32f2f",
          boxShadow: "0px 10px 20px rgba(211, 47, 47, 0.2)",
          maxWidth: "25rem",
          textAlign: "center",
          overflow: "hidden",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="error"
          sx={{
            textShadow: "1px 1px 3px rgba(211, 47, 47, 0.4)",
          }}
        >
          Error
        </Typography>

        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      </Paper>
    </Box>
  );
};

export default FullPageErrorMessage;
