import { screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as articlesSliceModule from "../../store/articlesSlice";
import * as authorsSliceModule from "../../store/authorsSlice";
import { IArticlesState, IAuthorsState } from "../../model";
import { renderWithProviders } from "../../test/utils";
import EditArticle from ".";

vi.spyOn(authorsSliceModule, "fetchAuthors").mockReturnValue(vi.fn());
vi.spyOn(articlesSliceModule, "fetchArticleById").mockReturnValue(vi.fn());

const initialArticlesState: IArticlesState = {
  articles: [],
  selectedArticle: undefined,
  loading: false,
  error: undefined,
};

const initialAuthorsState: IAuthorsState = {
  authors: [],
  selectedAuthor: undefined,
  loading: false,
  error: undefined,
};

const renderWithStore = (
  articlesState?: Partial<IArticlesState>,
  authorsState?: Partial<IAuthorsState>
) => {
  const store = configureStore({
    reducer: {
      articlesState: articlesSliceModule.articlesSlice.reducer,
      authorsState: authorsSliceModule.authorsSlice.reducer,
    },
    preloadedState: {
      articlesState: { ...initialArticlesState, ...articlesState },
      authorsState: { ...initialAuthorsState, ...authorsState },
    },
  });

  renderWithProviders(
    <Provider store={store}>
      <EditArticle />
    </Provider>
  );

  return store;
};

describe("EditArticle Component", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders loading spinner when data is loading", () => {
    renderWithStore({ loading: true }, { loading: true });
    expect(screen.getByTestId("full-page-spinner")).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    renderWithStore({ error: "Article error" });
    expect(screen.getByText("Article error")).toBeInTheDocument();
  });

  it("renders CreateOrEditTemplate when data is available", () => {
    renderWithStore(
      {
        selectedArticle: {
          id: 123,
          title: "Test Article",
          content: "content",
          authorId: 0,
          publicationDate: "publicationDate",
        },
      },
      {
        authors: [{ id: 1, name: "Author 1" }],
        selectedAuthor: { id: 1, name: "Author 1" },
      }
    );
    expect(screen.getByDisplayValue("Test Article")).toBeInTheDocument();
  });
});
