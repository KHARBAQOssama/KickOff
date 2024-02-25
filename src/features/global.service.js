import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";

const fetchGames = async (leagueId) => {
  const response = await api.get(
    `/fixtures?include=participants;scores&league_id=${leagueId}`
  );
  return response.data.data;
};

const fetchGame = async (gameId) => {
  const response = await api.get(
    `/fixtures/${gameId}?include=participants;participants.players;scores`
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
  try {
    const storedGames = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedGames = storedGames ? JSON.parse(storedGames) : [];
    return parsedGames;
  } catch (error) {
    console.error("Error loading saved games:", error);
  }
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
