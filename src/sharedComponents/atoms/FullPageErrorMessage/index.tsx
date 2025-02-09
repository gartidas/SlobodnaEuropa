import {
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NAVBAR_HEIGHT } from "../../../constants";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IFullPageErrorMessageProps {
  errorMessage: string;
  customFallback?: string;
}

const FullPageErrorMessage = ({
  errorMessage,
  customFallback,
}: IFullPageErrorMessageProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      direction="column"
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        height: `calc(100vh - ${NAVBAR_HEIGHT}px - 2rem)`,
        padding: "1rem",
      }}
    >
      <Link
        onClick={() => navigate(customFallback ?? "/articles")}
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          textDecoration: "none",
          color: "inherit",
          fontWeight: "500",
          fontSize: "1rem",
          alignSelf: "flex-end",
          justifySelf: "flex-start",
        }}
      >
        <ArrowBackIcon fontSize="small" />
        Go back
      </Link>

      <Paper
        elevation={3}
        sx={{
          padding: isMobile ? "1rem 2rem" : "3rem 8rem",
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
    </Stack>
  );
};

export default FullPageErrorMessage;
