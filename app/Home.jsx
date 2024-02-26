import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image
} from "react-native";
import Games from '../components/games'
import Leagues from '../components/leagues'
import { useDispatch, useSelector } from "react-redux";
import {  fetchGames, fetchLeagues, loadSavedGames, setActiveLeague, toggleGameSaving } from "../src/features/global.slice";
import Ad from "../components/Ad";

const Home = () => {
  const dispatch = useDispatch();
  const { games,leagues,activeLeague,savedGames } = useSelector((state) => state.global);
  useEffect(()=>{
    dispatch(loadSavedGames());
    dispatch(fetchLeagues());
  },[]);
  useEffect(() => {
    if (activeLeague) dispatch(fetchGames(activeLeague));
  }, [activeLeague]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#181829", paddingBottom: 4 }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#181829", color: "white" },
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 60, height: 75 }}
                source={require("../assets/images/logo.png")}
              />
            </View>
          ),
        }}
      />
      <Ad/>
      <Leagues leagues={leagues}/>
      <Games games={games}/>
    </SafeAreaView>
  );
};

export default Home;
