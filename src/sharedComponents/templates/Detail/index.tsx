import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchArticleById, deleteArticle } from "../../../store/articlesSlice";
import FullPageSpinner from "../../atoms/FullPageSpinner";
import FullPageErrorMessage from "../../atoms/FullPageErrorMessage";
import { NAVBAR_HEIGHT } from "../../../constants";
import dayjs from "dayjs";

const DetailTemplate = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const {
    selectedArticle,
    loading: articlesLoading,
    error: articlesError,
  } = useAppSelector((state) => state.articlesState);
  const {
    selectedAuthor,
    loading: authorLoading,
    error: authorError,
  } = useAppSelector((state) => state.authorsState);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId));
    }
  }, [dispatch, articleId]);

  const handleDelete = () => {
    if (articleId) {
      dispatch(deleteArticle(articleId));
      navigate("/articles#no-fetch=true");
    }
  };

  if (!selectedArticle || !selectedAuthor || articlesLoading || authorLoading)
    return <FullPageSpinner />;

  if (articlesError || authorError) {
    return (
      <FullPageErrorMessage
        errorMessage={
          articlesError || authorError || "An unknown error occurred"
        }
      />
    );
  }

  if (!selectedArticle) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isMobile ? "1rem 2rem" : "1rem 3rem",
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px - 2rem)`,
      }}
    >
      <Stack
        spacing="1.5rem"
        width="100%"
        maxWidth={isMobile ? "100%" : "60rem"}
      >
        <Link
          onClick={() => navigate("/articles")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
            fontWeight: "500",
            fontSize: "1rem",
            alignSelf: "flex-end",
          }}
        >
          <ArrowBackIcon fontSize="small" />
          Back to Articles
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2" color="text.secondary">
            {dayjs(selectedArticle.publicationDate).format("DD.MM.YYYY")}
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              sx={{ borderRadius: "50%" }}
              onClick={() => navigate(`/articles/${articleId}/edit`)}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              data-testid="delete-button"
              sx={{ borderRadius: "50%", color: "error.main" }}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold">
          {selectedArticle.title}
        </Typography>

        {selectedAuthor && (
          <Typography variant="subtitle1" color="text.secondary">
            by {selectedAuthor.name}
          </Typography>
        )}

        <Divider />

        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {selectedArticle.content}
        </Typography>
      </Stack>

      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this article? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetailTemplate;
