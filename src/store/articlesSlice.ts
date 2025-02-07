import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle } from "../model";

interface IArticlesState {
  articles: IArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: IArticlesState = {
  articles: [
    {
      id: "e05802a8-1626-4600-8390-6280424b9b31",
      author: "Johnny Halda",
      title: "How to cook",
      publicationDate: "today",
      content: "Content",
    },
    {
      id: "707d93c9-9e56-4f73-a971-69fe9923b9bf",
      author: "Johnny Halda",
      title: "How to sleep",
      publicationDate: "today",
      content: "Content",
    },
  ],
  loading: false,
  error: null,
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    fetchArticlesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArticlesSuccess(state, action: PayloadAction<IArticle[]>) {
      state.loading = false;
      state.articles = action.payload;
    },
    fetchArticlesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createArticle(state, action: PayloadAction<IArticle>) {
      state.articles.push(action.payload);
    },
    updateArticle(state, action: PayloadAction<IArticle>) {
      const index = state.articles.findIndex(
        (article) => article.id === action.payload.id
      );
      if (index !== -1) {
        state.articles[index] = action.payload;
      }
    },
    deleteArticle(state, action: PayloadAction<string>) {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
  },
});

export const {
  fetchArticlesStart,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  createArticle,
  updateArticle,
  deleteArticle,
} = articlesSlice.actions;
