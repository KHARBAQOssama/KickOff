import { Stack } from "expo-router";
import { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
} from "react-native";
import Favorites from "../components/favorites"
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, fetchLeagues, loadSavedGames, toggleGameSaving } from "../src/features/global.slice";
const SavedGames = () => {
  const dispatch = useDispatch();
  const { activeLeague } = useSelector((state) => state.global);
  useEffect(()=>{
    dispatch(loadSavedGames());
    dispatch(fetchLeagues());
  },[]);
  useEffect(() => {
    if (activeLeague){
      dispatch(fetchGames(activeLeague));
    }else{
      dispatch(fetchLeagues());
    }
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
              <Text style={{ color: "white", fontSize: 24 }}>KickOff</Text>
            </View>
          ),
        }}
      />
      <Favorites/>
    </SafeAreaView>
  );
};

export default SavedGames;
