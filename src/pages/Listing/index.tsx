import * as React from "react";
import { fetchArticlesStart } from "../../store/articlesSlice";
import { useAppSelector } from "../../store";

const Listing = () => {
  const articles = useAppSelector((state) => state.articlesState.articles);

  React.useEffect(() => {
    fetchArticlesStart();
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  );
};

export default Listing;
