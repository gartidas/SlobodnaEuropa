import { screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import * as authorsSliceModule from "../../store/authorsSlice";
import CreateArticle from "../../pages/Create";
import { renderWithProviders } from "../../test/utils";
import { IAuthorsState } from "../../model";

vi.spyOn(authorsSliceModule, "fetchAuthors").mockReturnValue(vi.fn());

const initialState: IAuthorsState = {
  authors: [],
  selectedAuthor: undefined,
  loading: false,
  error: undefined,
};

const renderWithStore = (preloadedState?: Partial<IAuthorsState>) => {
  const store = configureStore({
    reducer: { authorsState: authorsSliceModule.authorsSlice.reducer },
    preloadedState: {
      authorsState: { ...initialState, ...preloadedState },
    },
  });

  renderWithProviders(
    <Provider store={store}>
      <CreateArticle />
    </Provider>
  );

  return store;
};

describe("CreateArticle Component", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders FullPageSpinner when authors are loading", () => {
    renderWithStore({ authors: [], loading: true });
    expect(screen.getByTestId("full-page-spinner")).toBeInTheDocument();
  });

  it("renders FullPageErrorMessage when there is an error", () => {
    renderWithStore({ error: "Error fetching authors" });
    expect(screen.getByText("Error fetching authors")).toBeInTheDocument();
  });

  it("renders CreateOrEditTemplate when authors are available", () => {
    renderWithStore({
      authors: [{ id: 1, name: "John Doe" }],
      loading: false,
    });
    expect(screen.getByTestId("create-or-edit-template")).toBeInTheDocument();
  });
});
