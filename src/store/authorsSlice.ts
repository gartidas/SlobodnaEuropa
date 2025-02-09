import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IAuthor, IAuthorsState } from "../model";

// NOTE: Usually in env variables
const AUTHORS_API_URL = "https://jsonplaceholder.typicode.com/users/";

const initialState: IAuthorsState = {
  authors: [],
  selectedAuthor: undefined,
  loading: false,
  error: undefined,
};

export const fetchAuthors = createAsyncThunk<IAuthor[], void>(
  "authors/fetchAuthors",
  async (_NEVER, { rejectWithValue }) => {
    try {
      const response = await axios.get(AUTHORS_API_URL);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return response.data.map((user: any) => ({
        id: user.id,
        name: user.name,
      }));
    } catch (error) {
      return rejectWithValue(`Failed to fetch authors: ${error}`);
    }
  }
);

export const fetchAuthorByAuthorId = createAsyncThunk<IAuthor, number>(
  "authors/fetchAuthorByAuthorId",
  async (authorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${AUTHORS_API_URL}${authorId}`);

      const user = response.data;
      return { id: user.id, name: user.name };
    } catch (error) {
      return rejectWithValue(`Failed to fetch authors: ${error}`);
    }
  }
);

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    clearSelectedAuthor(state) {
      state.selectedAuthor = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        fetchAuthors.fulfilled,
        (state, action: PayloadAction<IAuthor[]>) => {
          state.loading = false;
          state.authors = action.payload;
        }
      )
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAuthorByAuthorId.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.selectedAuthor = undefined;
      })
      .addCase(
        fetchAuthorByAuthorId.fulfilled,
        (state, action: PayloadAction<IAuthor>) => {
          state.loading = false;
          state.selectedAuthor = action.payload;
        }
      )
      .addCase(fetchAuthorByAuthorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.selectedAuthor = undefined;
      });
  },
});

export const { clearSelectedAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
