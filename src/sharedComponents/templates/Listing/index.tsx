import * as React from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchArticles } from "../../../store/articlesSlice";
import FullPageSpinner from "../../atoms/FullPageSpinner";
import Article from "../../atoms/Article";
import FullPageErrorMessage from "../../atoms/FullPageErrorMessage";
import { NAVBAR_HEIGHT } from "../../../constants";
import AddNewArticleButton from "../../atoms/AddNewArticleButton";

const ListingTemplate = () => {
  const { articles, loading, error } = useAppSelector(
    (state) => state.articlesState
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) return <FullPageSpinner />;

  if (error) return <FullPageErrorMessage errorMessage={error} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "center",
        padding: "2rem",
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px - 4rem)`,
      }}
    >
      <AddNewArticleButton key="add" />

      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </Box>
  );
};

export default ListingTemplate;
