import { screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, Mocked } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as articlesSliceModule from "../../../store/articlesSlice";
import * as authorsSliceModule from "../../../store/authorsSlice";
import { IArticle, IArticlesState, IAuthorsState } from "../../../model";
import { renderWithProviders } from "../../../test/utils";
import CreateOrEditTemplate from ".";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

mockedAxios.post.mockImplementation((_, data) => Promise.resolve({ data }));
mockedAxios.put.mockImplementation((_, data) => Promise.resolve({ data }));

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
      <CreateOrEditTemplate
        authors={authorsState?.authors || []}
        selectedArticle={articlesState?.selectedArticle}
        selectedAuthor={authorsState?.selectedAuthor}
      />
    </Provider>
  );

  return store;
};

describe("CreateOrEditTemplate Component", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders the form correctly", () => {
    renderWithStore();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Publication Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("prefills the form when an article is selected", () => {
    renderWithStore(
      {
        selectedArticle: {
          id: 1,
          title: "Existing Title",
          content: "Existing content",
          publicationDate: "2024-02-01",
          authorId: 1,
        },
      },
      {
        authors: [{ id: 1, name: "Author 1" }],
        selectedAuthor: { id: 1, name: "Author 1" },
      }
    );
    expect(screen.getByDisplayValue("Existing Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Existing content")).toBeInTheDocument();
    expect(screen.getByDisplayValue("01.02.2024")).toBeInTheDocument();
  });

  it("renders validation errors when submitting an empty form", async () => {
    renderWithStore();

    await userEvent.click(screen.getByTestId("submit-button"));

    expect(await screen.findByText("Title is required")).toBeInTheDocument();
    expect(await screen.findByText("Author is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Publication Date is required")
    ).toBeInTheDocument();
    expect(await screen.findByText("Content is required")).toBeInTheDocument();
  });

  it("dispatches createArticle when submitting a new article", async () => {
    const store = renderWithStore(
      {
        selectedArticle: {
          publicationDate: "2004-05-01",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      },
      {
        authors: [{ id: 1, name: "Author" }],
        selectedAuthor: { id: 1, name: "Author" },
      }
    );

    await userEvent.type(screen.getByLabelText("Title"), "New Article");
    await userEvent.type(screen.getByLabelText("Content"), "Some content");

    await userEvent.click(screen.getByTestId("submit-button"));

    expect(store.getState().articlesState.articles[0]).toEqual({
      id: undefined,
      title: "New Article",
      content: "Some content",
      publicationDate: "2004-05-01",
      authorId: 1,
    });
  });

  it("dispatches updateArticle when editing an existing article", async () => {
    const mockArticle: IArticle = {
      id: 1,
      title: "Existing Title",
      content: "Existing content",
      publicationDate: "2024-02-01",
      authorId: 1,
    };

    const store = renderWithStore(
      {
        selectedArticle: mockArticle,
        articles: [mockArticle],
      },
      {
        authors: [{ id: 1, name: "Author" }],
        selectedAuthor: { id: 1, name: "Author" },
      }
    );

    await userEvent.clear(screen.getByLabelText("Title"));
    await userEvent.type(screen.getByLabelText("Title"), "Updated title");
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(store.getState().articlesState.articles[0].title).toEqual(
      "Updated title"
    );
  });
});
