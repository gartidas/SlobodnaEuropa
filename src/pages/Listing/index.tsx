import DefaultLayout from "../../sharedComponents/molecules/DefaultLayout";
import ListingTemplate from "../../sharedComponents/templates/Listing";

const ArticleListing = () => {
  return (
    <DefaultLayout isFabVisible={true}>
      <ListingTemplate />
    </DefaultLayout>
  );
};

export default ArticleListing;
