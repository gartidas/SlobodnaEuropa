import * as React from "react";
import {
  Box,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
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
  const sortOrder = searchParams.get("sort") || "default";
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
    const params = new URLSearchParams(searchParams);
    if (value.trim()) params.set("q", value);
    else params.delete("q");

    navigate(`/articles?${params.toString()}`, { replace: true });
  }, 300);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const params = new URLSearchParams(searchParams);
    const selectedSort = event.target.value as string;

    if (selectedSort === "default") {
      params.delete("sort");
    } else {
      params.set("sort", selectedSort);
    }

    navigate(`/articles?${params.toString()}`, { replace: true });
  };

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

  const sortArticles = (a: IArticle, b: IArticle) => {
    if (sortOrder === "default") return 0;

    const authorA =
      authors.find((author) => author.id === a.authorId)?.name || "";
    const authorB =
      authors.find((author) => author.id === b.authorId)?.name || "";

    switch (sortOrder) {
      case "alpha-asc":
        return authorA.localeCompare(authorB) || a.title.localeCompare(b.title);
      case "alpha-desc":
        return authorB.localeCompare(authorA) || b.title.localeCompare(a.title);
      case "chron-asc":
        return (
          dayjs(a.publicationDate).valueOf() -
          dayjs(b.publicationDate).valueOf()
        );
      case "chron-desc":
        return (
          dayjs(b.publicationDate).valueOf() -
          dayjs(a.publicationDate).valueOf()
        );
      default:
        return 0;
    }
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

  if (articlesError || authorsError) {
    return (
      <FullPageErrorMessage
        errorMessage={
          articlesError || authorsError || "An unknown error occurred"
        }
      />
    );
  }

  if (!authors || !articles || articlesLoading || authorsLoading)
    return <FullPageSpinner />;

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
      <Stack
        direction="row"
        gap="1.5rem"
        sx={{
          width: "100%",
          maxWidth: "80%",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Search articles..."
          variant="outlined"
          defaultValue={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{
            minWidth: "18.75rem",
            width: "60%",
          }}
        />

        <FormControl sx={{ minWidth: "fit-content" }}>
          <InputLabel>Sort by</InputLabel>

          <Select value={sortOrder} onChange={handleSortChange} label="Sort by">
            <MenuItem value="default">Default (None)</MenuItem>

            <MenuItem value="alpha-asc">Alphabetically (A → Z)</MenuItem>

            <MenuItem value="alpha-desc">Alphabetically (Z → A)</MenuItem>

            <MenuItem value="chron-asc">
              Chronologically (Oldest → Newest)
            </MenuItem>

            <MenuItem value="chron-desc">
              Chronologically (Newest → Oldest)
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>

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
          onClick={() => navigate("/articles/create")}
        />

        {articles
          .filter(filterBySearchValue)
          .sort(sortArticles)
          .map((article) => {
            const author = authors.find(
              (author) => author.id === article.authorId
            );

            return (
              <Article key={article.id} article={article} author={author} />
            );
          })}
      </Box>
    </Stack>
  );
};

export default ListingTemplate;
