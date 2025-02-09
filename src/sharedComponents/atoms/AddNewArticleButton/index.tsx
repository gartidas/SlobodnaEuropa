import { Paper, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface IAddNewArticleButtonProps {
  onClick?: () => void;
}

const AddNewArticleButton = ({ onClick }: IAddNewArticleButtonProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "20rem",
        minHeight: "16rem",
        padding: "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "1rem",
        backgroundColor: "#fff",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
        cursor: "pointer",
        position: "relative",

        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <AddIcon sx={{ fontSize: "5rem", color: "#1976d2" }} />
      </Box>
    </Paper>
  );
};

export default AddNewArticleButton;
