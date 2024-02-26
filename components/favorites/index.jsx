import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, fetchLeagues } from "../../src/features/global.slice";
import Card from "../games/Card";
import { ScrollView, View,Image, Text } from "react-native";

const index = () => {
  const [fixtures, setFixtures] = useState([]);
  const dispatch = useDispatch();
  const { games, activeLeague, savedGames } = useSelector(
    (state) => state.global
  );
  useEffect(() => {
    if (activeLeague){
      dispatch(fetchGames(activeLeague));
    }else{
      dispatch(fetchLeagues());
    }
  }, [activeLeague]);
  useEffect(() => {
    if (games.length != 0) {
      const savedFixtures = games.filter((item) =>
        savedGames.includes(item.id)
      );
      setFixtures(savedFixtures);
    }
  }, [savedGames, games]);
  return (
    <ScrollView style={{ padding: 25 }}>
      {fixtures.length == 0 ? (
        <>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ height: 150, width: 200 }}
              source={require("../../assets/icons/empty-folder.png")}
            />
            <Text
              style={{
                color: "#00B8FF",
                fontSize: 22,
                fontWeight: 600,
                textAlign: "center",
                marginTop: 24,
              }}
            >
              You have no favorites for the moment
            </Text>
          </View>
        </>
      ) : (
        fixtures.map((fixture) => (
            <Card fixture={fixture}/>
        ))
      )}
    </ScrollView>
  );
};

export default index;
