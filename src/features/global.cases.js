export const fetchGamesFulfilled = (state, action) => {
    state.games = action.payload
};
export const fetchLeaguesFulfilled = (state, action) => {
    state.leagues = action.payload;
    state.activeLeague = state.leagues[0].id;
};
