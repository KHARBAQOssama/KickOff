import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import globalService from "./global.service";
import { fetchGamesFulfilled, fetchLeaguesFulfilled } from "./global.cases";

const initialState = {
  games: [],
  savedGames: [],
  activeLeague: null,
  leagues: [],
  players: [],
  playerDetail: null,
  gameDetails: null,
};

export const fetchGames = createAsyncThunk(
  "fetchGames",
  async (activeLeague) => {
    const response = await globalService.fetchGames(activeLeague);
    return response;
  }
);

export const fetchGame = createAsyncThunk("fetchGame", async (gameId) => {
  return await globalService.fetchGame(gameId);
});

export const fetchPlayers = createAsyncThunk("fetchPlayers", async () => {
  return await globalService.fetchPlayers();
});

export const fetchPlayer = createAsyncThunk("fetchPlayer", async (playerId) => {
  return await globalService.fetchPlayer(playerId);
});

export const fetchLeagues = createAsyncThunk("fetchLeagues", async () => {
  return await globalService.fetchLeagues();
});

export const loadSavedGames = createAsyncThunk(
  "loadSavedGames",
  async () => {}
);

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.fulfilled, (state, action) => {
        fetchGamesFulfilled(state, action);
      })
      .addCase(fetchLeagues.fulfilled, (state, action) => {
        fetchLeaguesFulfilled(state, action);
      });
  },
});

export default globalSlice.reducer;
