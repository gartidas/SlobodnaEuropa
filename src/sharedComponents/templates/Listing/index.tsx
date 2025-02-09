import * as React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  clearSelectedArticle,
  fetchArticles,
} from "../../../store/articlesSlice";
import FullPageSpinner from "../../atoms/FullPageSpinner";
import Article from "../../atoms/Article";
import FullPageErrorMessage from "../../atoms/FullPageErrorMessage";
import { NAVBAR_HEIGHT } from "../../../constants";
import AddNewArticleButton from "../../atoms/AddNewArticleButton";
import { useLocation, useNavigate } from "react-router";
import { clearSelectedAuthor, fetchAuthors } from "../../../store/authorsSlice";

const ListingTemplate = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
  } = useAppSelector((state) => state.articlesState);
  const {
    authors,
    loading: authorsLoading,
    error: authorsError,
  } = useAppSelector((state) => state.authorsState);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (hash === "") {
      dispatch(fetchArticles());
      dispatch(fetchAuthors());
    } else {
      navigate("/articles", { replace: true });
    }

    dispatch(clearSelectedArticle());
    dispatch(clearSelectedAuthor());

    // NOTE: Hash change may trigger re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate]);

  if (!authors || !articles || articlesLoading || authorsLoading)
    return <FullPageSpinner />;

  if (articlesError || authorsError) {
    return (
      <FullPageErrorMessage
        errorMessage={
          articlesError || authorsError || "An unknown error occurred"
        }
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "center",
        padding: isMobile ? "2rem" : "2rem 10rem",
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px - 4rem)`,
      }}
    >
      <AddNewArticleButton
        key="add"
        onClick={() => {
          navigate("/articles/create");
        }}
      />

      {articles.map((article) => {
        const author = authors.find((author) => author.id === article.authorId);

        return <Article key={article.id} article={article} author={author} />;
      })}
    </Box>
  );
};

export default ListingTemplate;
