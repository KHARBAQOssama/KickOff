import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gamesService from "./games.service";

const initialState = {
  games: [],
  savedGames: [],
};

export const fetchGames = createAsyncThunk("games/fetch", async () => {
  await gamesService.fetchGames();
});

export const gamesSlice = createSlice({
  name: "gamesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default gamesSlice.reducer;
