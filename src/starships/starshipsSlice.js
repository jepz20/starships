import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { getStartships } from "./api/swapi";

export const initialState = {
  ids: [],
  entities: {},
  hasMore: false,
  status: "idle",
  favorites: {},
  comments: {},
};

export const fetchStarships = createAsyncThunk(
  "starships/fetchStarships",
  async (page) => {
    const response = await getStartships(page);
    if (!response.results) {
      return { results: [] };
    }
    return response;
  }
);

const starshipsSlice = createSlice({
  name: "starships",
  initialState,
  reducers: {
    starshipFavoriteToggle(state, action) {
      const { name } = action.payload;
      if (!state.favorites[name]) {
        state.favorites[name] = true;
      } else {
        delete state.favorites[name];
      }
    },
    starshipEditComment(state, action) {
      const { name, comment } = action.payload;
      state.comments[name] = comment;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarships.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        const newEntities = { ...state.entities };
        const newIds = [...state.ids];
        const { results, next } = action.payload;
        results.forEach((starship) => {
          if (!newEntities[starship.name]) {
            newIds.push(starship.name);
          }
          newEntities[starship.name] = { ...starship };
        });
        state.entities = newEntities;
        state.hasMore = !!next;
        state.ids = newIds;
        state.status = "idle";
      })
      .addCase(fetchStarships.rejected, (state, action) => {
        const { message } = action.error || {};
        state.status = "error";
        state.error = message;
      });
  },
});

export const { starshipFavoriteToggle, starshipEditComment } =
  starshipsSlice.actions;

export default starshipsSlice.reducer;

export const selectStarships = createSelector((state) => state);
