import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle } from "../model";
import axios from "axios";
import { getRandomDate } from "../utils";

interface IArticlesState {
  articles: IArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: IArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk<IArticle[], void>(
  "articles/fetchArticles",
  async () => {
    const postsResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = postsResponse.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userIds = [...new Set(posts.map((post: any) => post.userId))];

    const usersResponse = await Promise.all(
      userIds.map((id) =>
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      )
    );

    const usersMap = usersResponse.reduce((acc, res) => {
      acc[res.data.id] = res.data.name;
      return acc;
    }, {} as Record<number, string>);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return posts.map((post: any) => ({
      id: post.id.toString(),
      author: usersMap[post.userId] || undefined,
      title: post.title,
      publicationDate: getRandomDate(),
      content: post.body,
    }));
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchArticles.fulfilled,
      (state, action: PayloadAction<IArticle[]>) => {
        state.loading = false;
        state.articles = action.payload;
      }
    );
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
  },
});

export const { createArticle, updateArticle, deleteArticle } =
  articlesSlice.actions;
