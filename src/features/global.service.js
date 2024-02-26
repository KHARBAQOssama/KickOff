import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
const STORAGE_KEY = "savedGames";

const fetchGames = async (leagueId) => {
  const response = await api.get(
    `/fixtures?include=participants;scores&league_id=${leagueId}`
  );
  return response.data.data;
};

const fetchGame = async (gameId) => {
  const response = await api.get(
    `/fixtures/${gameId}?include=league;participants;lineups;lineups.player;venue`
  );
  return response.data.data;
};
const fetchPlayers = async () => {
  const response = await api.get(`/players?include=country;position`);
  return response.data.data;
};

const fetchPlayer = async (playerId) => {
  const response = await api.get(
    `/players/${playerId}?include=country;position`
  );
  return response.data.data;
};

const fetchLeagues = async () => {
  const response = await api.get(`/leagues`);
  return response.data.data;
};

const loadSavedGames = async () => {
    const storedGames = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedGames = storedGames ? JSON.parse(storedGames) : [];
    return parsedGames;
};
const unSaveGame = async (gameId) => {};
const globalService = {
  fetchGames,
  fetchGame,
  fetchLeagues,
  fetchPlayer,
  fetchPlayers,
  loadSavedGames,
};
export default globalService;
