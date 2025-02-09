import * as React from "react";
import { Box, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
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
import useDebounce from "../../../hooks/useDebounce";
import { IArticle } from "../../../model";
import dayjs from "dayjs";

const ListingTemplate = () => {
  const navigate = useNavigate();
  const { hash, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get("q") || "";
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

  const handleSearchChange = useDebounce((value) => {
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value);
    navigate(`/articles?${params.toString()}`, { replace: true });
  }, 300);

  const filterBySearchValue = (article: IArticle) => {
    if (!searchValue) return true;

    const author = authors.find((a) => a.id === article.authorId);
    const lowerSearch = searchValue.toLowerCase();

    return (
      article.title.toLowerCase().includes(lowerSearch) ||
      article.content.toLowerCase().includes(lowerSearch) ||
      dayjs(article.publicationDate)
        .format("DD.MM.YYYY")
        .includes(lowerSearch) ||
      (author && author.name.toLowerCase().includes(lowerSearch))
    );
  };

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
    <Stack
      direction="column"
      sx={{
        alignItems: "center",
        gap: "1.5rem",
        padding: isMobile ? "2rem" : "2rem 10rem",
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px - 4rem)`,
      }}
    >
      <TextField
        fullWidth
        label="Search articles..."
        variant="outlined"
        defaultValue={searchValue}
        sx={{
          maxWidth: isMobile ? "100%" : "60%",
        }}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          padding: isMobile ? "0 2rem" : "0 10rem",
          maxWidth: "100%",
          justifyContent: "center",
        }}
      >
        <AddNewArticleButton
          key="add"
          onClick={() => {
            navigate("/articles/create");
          }}
        />

        {articles.filter(filterBySearchValue).map((article) => {
          const author = authors.find(
            (author) => author.id === article.authorId
          );

          return <Article key={article.id} article={article} author={author} />;
        })}
      </Box>
    </Stack>
  );
};

export default ListingTemplate;
