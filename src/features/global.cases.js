import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "savedGames";

export const fetchGamesFulfilled = (state, action) => {
  state.games = action.payload;
};
export const fetchLeaguesFulfilled = (state, action) => {
  state.leagues = action.payload;
  state.activeLeague = state.leagues[0].id;
};
export const loadSavedFulfilled = (state, action) => {
  state.savedGames = action.payload;
};
export const fetchPlayersFulfilled = (state, action) => {
  state.players = action.payload;
};
export const fetchPlayerFulfilled = (state, action) => {
  state.playerDetails = action.payload;
};
export const fetchGameFulfilled = (state, action) => {
  state.gameDetails = action.payload;
};
export const setActiveLeagueFulfilled = (state, action) => {
  state.activeLeague = action.payload;
};
export const toggleGameSavingFulfilled = (state, action) => {
  const gameId = action.payload;

  const updatedGames = state.savedGames.includes(gameId)
    ? state.savedGames.filter((id) => id !== gameId)
    : [...state.savedGames, gameId];

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));
  state.savedGames = updatedGames;
};
