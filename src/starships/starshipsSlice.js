import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { getInitialStarships } from "./api/swapi";

const initialState = { ids: [], entities: {}, status: "idle" };

export const fetchStarships = createAsyncThunk(
  "starships/fetchStarships",
  async () => {
    const response = await getInitialStarships();
    return response;
  }
);

const starshipsSlice = createSlice({
  name: "starships",
  initialState,
  reducers: {
    starshipFavoriteToggle(state, action) {
      const { name } = action.payload;
      const ship = state.entities[name];
      ship.favorite = !ship.favorite;
    },
    starshipFavoriteComment(state, action) {
      const { name, comment } = action.payload;
      const ship = state.entities[name];
      ship.comment = comment;
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
          newEntities[starship.name] = starship;
        });
        state.entities = newEntities;
        state.hasMore = !!next;
        state.ids = newIds;
        state.status = "idle";
      })
      .addCase(fetchStarships.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const {
  addStarships,
  starshipFavoriteToggle,
  starshipFavoriteComment,
  starshipsLoading,
} = starshipsSlice.actions;

export default starshipsSlice.reducer;

export const selectStarships = createSelector((state) => state);
