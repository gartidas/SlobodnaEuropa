import * as React from "react";
import FullPageErrorMessage from "../../sharedComponents/atoms/FullPageErrorMessage";
import FullPageSpinner from "../../sharedComponents/atoms/FullPageSpinner";
import DefaultLayout from "../../sharedComponents/molecules/DefaultLayout";
import CreateOrEditTemplate from "../../sharedComponents/templates/CreateOrEdit";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAuthors } from "../../store/authorsSlice";

const CreateArticle = () => {
  const {
    authors,
    loading: authorLoading,
    error: authorError,
  } = useAppSelector((state) => state.authorsState);
  const dispatch = useAppDispatch();

  const getCreatePageContent = () => {
    if (authorError) {
      return (
        <FullPageErrorMessage
          errorMessage={authorError}
          customFallback="/articles/create"
        />
      );
    }

    if (!authors || authorLoading) return <FullPageSpinner />;

    return <CreateOrEditTemplate authors={authors} />;
  };

  React.useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  return <DefaultLayout>{getCreatePageContent()}</DefaultLayout>;
};

export default CreateArticle;
