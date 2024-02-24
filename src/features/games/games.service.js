import api from "../../api";

const fetchGames = async (leagueId) => {
    const response = await api.get(`/fixtures?include=participants;scores&league_id=${leagueId}`);
    return response.data.data;
};

const gamesService = {fetchGames}
export default gamesService