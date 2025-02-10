import * as React from "react";
import { useParams } from "react-router";
import DefaultLayout from "../../sharedComponents/molecules/DefaultLayout";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchArticleById } from "../../store/articlesSlice";
import CreateOrEditTemplate from "../../sharedComponents/templates/CreateOrEdit";
import { fetchAuthors } from "../../store/authorsSlice";
import FullPageSpinner from "../../sharedComponents/atoms/FullPageSpinner";
import FullPageErrorMessage from "../../sharedComponents/atoms/FullPageErrorMessage";

const EditArticle = () => {
  const { articleId } = useParams();
  const {
    selectedArticle,
    loading: articlesLoading,
    error: articlesError,
  } = useAppSelector((state) => state.articlesState);
  const {
    authors,
    selectedAuthor,
    loading: authorLoading,
    error: authorError,
  } = useAppSelector((state) => state.authorsState);
  const dispatch = useAppDispatch();

  const getEditPageContent = () => {
    if (articlesError || authorError) {
      return (
        <FullPageErrorMessage
          errorMessage={
            articlesError || authorError || "An unknown error occurred"
          }
          customFallback={`/articles/${articleId}/edit`}
        />
      );
    }

    if (
      !authors ||
      !selectedArticle ||
      !selectedAuthor ||
      articlesLoading ||
      authorLoading
    )
      return <FullPageSpinner />;

    return (
      <CreateOrEditTemplate
        authors={authors}
        selectedArticle={selectedArticle}
        selectedAuthor={selectedAuthor}
      />
    );
  };

  React.useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  React.useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId));
    }
  }, [articleId, dispatch]);

  return <DefaultLayout>{getEditPageContent()}</DefaultLayout>;
};

export default EditArticle;
