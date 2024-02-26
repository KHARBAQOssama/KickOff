import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import globalService from "./global.service";
import {
  fetchGameFulfilled,
  fetchGamesFulfilled,
  fetchLeaguesFulfilled,
  fetchPlayerFulfilled,
  fetchPlayersFulfilled,
  loadSavedFulfilled,
  setActiveLeagueFulfilled,
  toggleGameSavingFulfilled
} from "./global.cases";
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

export const loadSavedGames = createAsyncThunk("loadSavedGames", async () => {
  return await globalService.loadSavedGames();
});

export const toggleGameSaving = createAsyncThunk("toggleSave", async (gameId) => {
  return gameId;
});
export const setActiveLeague = createAsyncThunk("setActiveLeague",async (leagueId)=>{
  return leagueId
})
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
      })
      .addCase(loadSavedGames.fulfilled, (state, action) => {
        loadSavedFulfilled(state, action);
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        fetchPlayersFulfilled(state, action);
      })
      .addCase(fetchPlayer.fulfilled, (state, action) => {
        fetchPlayerFulfilled(state, action);
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        fetchGameFulfilled(state, action);
      })
      .addCase(toggleGameSaving.fulfilled, (state, action) => {
        toggleGameSavingFulfilled(state, action);
      })
      .addCase(setActiveLeague.fulfilled, (state, action) => {
        setActiveLeagueFulfilled(state, action);
      });
  },
});

export default globalSlice.reducer;
