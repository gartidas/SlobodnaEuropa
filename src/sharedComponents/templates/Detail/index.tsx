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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchArticleById } from "../../../store/articlesSlice";
import FullPageSpinner from "../../atoms/FullPageSpinner";
import FullPageErrorMessage from "../../atoms/FullPageErrorMessage";
import { NAVBAR_HEIGHT } from "../../../constants";

const DetailTemplate = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { selectedArticle, loading, error } = useAppSelector(
    (state) => state.articlesState
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId));
    }
  }, [dispatch, articleId]);

  if (loading) return <FullPageSpinner />;

  if (error) return <FullPageErrorMessage errorMessage={error} />;

  if (!selectedArticle) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isMobile ? "1rem 2rem" : "1rem 3rem",
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px - 4rem)`,
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
            {selectedArticle.publicationDate}
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton sx={{ borderRadius: "50%" }}>
              <EditIcon />
            </IconButton>

            <IconButton sx={{ borderRadius: "50%", color: "error.main" }}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold">
          {selectedArticle.title.charAt(0).toUpperCase() +
            selectedArticle.title.slice(1)}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary">
          by {selectedArticle.author}
        </Typography>

        <Divider />

        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {selectedArticle.content.charAt(0).toUpperCase() +
            selectedArticle.content.slice(1)}
        </Typography>
      </Stack>
    </Box>
  );
};

export default DetailTemplate;
