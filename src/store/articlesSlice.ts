import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticlesState, IDomainPost } from "../model";
import axios from "axios";
import { getRandomDate, mapDomainPostToArticle } from "../utils";
import { fetchAuthorByAuthorId } from "./authorsSlice";

// NOTE: Usually in env variables
const ARTICLES_API_URL = "https://jsonplaceholder.typicode.com/posts/";

const initialState: IArticlesState = {
  articles: [],
  selectedArticle: undefined,
  pendingRollbackArticle: undefined,
  loading: false,
  error: undefined,
};

export const fetchArticles = createAsyncThunk<IDomainPost[], void>(
  "articles/fetchArticles",
  async (_NEVER, { rejectWithValue }) => {
    try {
      const postsResponse = await axios.get<IDomainPost[]>(ARTICLES_API_URL);

      return postsResponse.data.map((post) => {
        return { ...post, publicationDate: getRandomDate() };
      });
    } catch (error) {
      return rejectWithValue(`Failed to fetch articles: ${error}`);
    }
  }
);

export const fetchArticleById = createAsyncThunk<IDomainPost, string>(
  "articles/fetchArticleById",
  async (articleId, { dispatch, rejectWithValue }) => {
    try {
      const postResponse = await axios.get<IDomainPost>(
        `${ARTICLES_API_URL}${articleId}`
      );

      const post = { ...postResponse.data, publicationDate: getRandomDate() };

      dispatch(fetchAuthorByAuthorId(postResponse.data.userId!));

      return post;
    } catch (error) {
      return rejectWithValue(`Failed to fetch article: ${error}`);
    }
  }
);

export const createArticle = createAsyncThunk<IDomainPost, IDomainPost>(
  "articles/createArticle",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axios.post<IDomainPost>(ARTICLES_API_URL, post);

      return response.data;
    } catch (error) {
      return rejectWithValue(`Failed to create article: ${error}`);
    }
  }
);

export const updateArticle = createAsyncThunk<IDomainPost, IDomainPost>(
  "articles/updateArticle",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axios.put<IDomainPost>(
        `${ARTICLES_API_URL}${post.id}`,
        post
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(`Failed to update article: ${error}`);
    }
  }
);

export const deleteArticle = createAsyncThunk<string, string>(
  "articles/deleteArticle",
  async (articleId, { rejectWithValue }) => {
    try {
      await axios.delete(`${ARTICLES_API_URL}${articleId}`);

      return articleId;
    } catch (error) {
      return rejectWithValue(`Failed to delete article: ${error}`);
    }
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearSelectedArticle(state) {
      state.selectedArticle = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<IDomainPost[]>) => {
          state.loading = false;
          state.articles = action.payload.map((post) =>
            mapDomainPostToArticle(post)
          );
        }
      )
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.selectedArticle = undefined;
      })
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<IDomainPost>) => {
          state.loading = false;
          state.selectedArticle = mapDomainPostToArticle(action.payload);
        }
      )
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.selectedArticle = undefined;
      })
      .addCase(createArticle.pending, (state, action) => {
        const tempArticle = mapDomainPostToArticle(action.meta.arg);
        state.articles = [tempArticle, ...state.articles];
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(
          (a) => a.id === action.meta.arg.id
        );

        if (index !== -1) {
          state.articles[index] = mapDomainPostToArticle(action.payload);
        }
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.articles = state.articles.filter(
          (article) => article.id !== action.meta.arg.id
        );
        state.error = action.payload as string;
      })
      .addCase(updateArticle.pending, (state, action) => {
        const updatedArticle = mapDomainPostToArticle(action.meta.arg);
        const index = state.articles.findIndex(
          (a) => a.id === updatedArticle.id
        );

        if (index !== -1) {
          state.pendingRollbackArticle = state.articles[index];

          state.articles[index] = updatedArticle;
        }
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const updatedArticle = mapDomainPostToArticle(action.payload);
        const index = state.articles.findIndex(
          (a) => a.id === updatedArticle.id
        );

        if (index !== -1) {
          state.articles[index] = updatedArticle;
        }

        state.pendingRollbackArticle = undefined;
      })
      .addCase(updateArticle.rejected, (state) => {
        if (state.pendingRollbackArticle) {
          const rollbackArticle = state.pendingRollbackArticle;
          const index = state.articles.findIndex(
            (a) => a.id === rollbackArticle.id
          );

          if (index !== -1) {
            state.articles[index] = rollbackArticle;
          }
        }

        state.pendingRollbackArticle = undefined;
      })
      .addCase(deleteArticle.pending, (state, action) => {
        state.articles = state.articles.filter(
          (article) => article.id !== Number.parseInt(action.meta.arg)
        );
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
