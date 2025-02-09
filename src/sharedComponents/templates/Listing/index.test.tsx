import { screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as articlesSliceModule from "../../../store/articlesSlice";
import * as authorsSliceModule from "../../../store/authorsSlice";
import { IArticlesState, IAuthorsState } from "../../../model";
import { renderWithProviders } from "../../../test/utils";
import ListingTemplate from ".";

vi.spyOn(authorsSliceModule, "fetchAuthors").mockReturnValue(vi.fn());
vi.spyOn(articlesSliceModule, "fetchArticles").mockReturnValue(vi.fn());

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
      <ListingTemplate />
    </Provider>
  );

  return store;
};

describe("ListingTemplate Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
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

  it("renders articles when data is available", () => {
    renderWithStore(
      {
        articles: [
          {
            id: 1,
            title: "Article 1",
            content: "Content",
            authorId: 1,
            publicationDate: "2024-02-09",
          },
        ],
      },
      {
        authors: [{ id: 1, name: "Author 1" }],
      }
    );

    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("by Author 1")).toBeInTheDocument();
  });
});
