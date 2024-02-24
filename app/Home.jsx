import axios from "axios";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDateTime } from "../src/utils/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "savedGames";
const Home = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [savedGames, setSavedGames] = useState([]);
  const [activeLeague, setActiveLeague] = useState(null);
  const toggleGame = async (gameId) => {
    try {
      const updatedGames = savedGames.includes(gameId)
        ? savedGames.filter((id) => id !== gameId)
        : [...savedGames, gameId];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));
      setSavedGames(updatedGames);
    } catch (error) {
      console.error("Error toggling game:", error);
    }
  };
  useEffect(() => {
    const loadSavedGames = async () => {
      try {
        const storedGames = await AsyncStorage.getItem(STORAGE_KEY);
        const parsedGames = storedGames ? JSON.parse(storedGames) : []; // Handle cases where value is null or non-JSON
        setSavedGames(parsedGames);
      } catch (error) {
        console.error("Error loading saved games:", error);
      }
    };

    loadSavedGames();
  }, []);
  useEffect(async () => {
    axios
      .get("https://api.sportmonks.com/v3/football/leagues", {
        headers: {
          Authorization:
            "tYgX0otkxc857iGQk2dAVFYOiNCNGi9Qr2sUH40UVpHphNDjdeIdXvrRwb4I",
        },
      })
      .then((response) => {
        setData(response.data.data);
        setActiveLeague(response.data.data[0].id);
      });
  }, []);
  useEffect(() => {
    if (activeLeague) {
      axios
        .get(
          `https://api.sportmonks.com/v3/football/fixtures?include=participants&league_id=${activeLeague}`,
          {
            headers: {
              Authorization:
                "tYgX0otkxc857iGQk2dAVFYOiNCNGi9Qr2sUH40UVpHphNDjdeIdXvrRwb4I",
            },
          }
        )
        .then((response) => {
          setFixtures(response.data.data);
        });
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
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://www.uefa.com/uefachampionsleague/");
        }}
        style={{
          alignItems: "center",
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        <Image
          style={{ width: "100%", height: 205 }}
          source={require("../assets/images/landingHome.png")}
        />
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 20 }}>
        {data.length != 0 && (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  margin: 10,
                  backgroundColor: "#222232",
                  borderRadius: 18,
                }}
                onPress={() => {
                  setActiveLeague(item.id);
                  // router.push(`/search/${item}`);
                }}
              >
                {item.id == activeLeague ? (
                  <LinearGradient
                    colors={["#F4A58A", "#ED6B4E"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderRadius: 18,
                    }}
                  >
                    <Image
                      style={{ height: 25, width: 25 }}
                      source={{ uri: item.image_path }}
                    />
                    <Text
                      style={{ fontWeight: 500, color: "white", fontSize: 18 }}
                    >
                      {item.name}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderRadius: 18,
                    }}
                  >
                    <Image
                      style={{ height: 25, width: 25 }}
                      source={{ uri: item.image_path }}
                    />
                    <Text
                      style={{ fontWeight: 500, color: "white", fontSize: 18 }}
                    >
                      {item.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{}}
            horizontal
          />
        )}
      </View>
      {/* <View style={{flexDirection: "row", paddingHorizontal:30 ,}}>
        <TouchableOpacity style={{width:"50%", padding:5,borderBottomWidth: 5, borderColor: activeChoice =="fixtres"? "#246BFD":"#6D6D6D"}}>
          <Text style={{color: activeChoice =="fixtres"? "#246BFD":"#6D6D6D",textAlign:"center",fontWeight:500, fontSize:20}}>Fixtures</Text>
        </TouchableOpacity>
      </View> */}
      <ScrollView style={{ padding: 25 }}>
        {fixtures.length != 0 &&
          fixtures.map((fixture) => (
            <View
              style={{
                backgroundColor: "#14274C",
                height: 100,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 8,
                position: "relative",
              }}
              key={fixture.id}
            >
              <TouchableOpacity
                onPress={() => {
                  toggleGame(fixture.id);
                }}
                style={{ position: "absolute", top: 16, right: 16 }}
              >
                {savedGames.includes(fixture.id) ? (
                  <Image
                    style={{ height: 24, width: 24 }}
                    source={require("../assets/icons/red-heart.png")}
                  />
                ) : (
                  <Image
                    style={{ height: 24, width: 24 }}
                    source={require("../assets/icons/heart.png")}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 12,
                }}
                onPress={() => {
                  router.push(`game-details/${fixture.id}`);
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "flex-end",
                    width: 75,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "white",
                      fontWeight: 700,
                      maxWidth: 60,
                      fontSize: 18,
                    }}
                  >
                    {fixture.participants[0].short_code ||
                      fixture.participants[0].name}
                  </Text>
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={{ uri: fixture.participants[0].image_path }}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text
                    numberOfLines={1}
                    style={{ color: "#FD4A54", fontWeight: 700, fontSize: 16 }}
                  >
                    {formatDateTime(fixture.starting_at)[1]}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: "#ADADAD", fontWeight: 500 }}
                  >
                    {formatDateTime(fixture.starting_at)[0]}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "flex-start",
                    width: 75,
                  }}
                >
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={{ uri: fixture.participants[1].image_path }}
                  />
                  <Text
                    numberOfLines={1}
                    style={{ color: "white", fontWeight: 700, fontSize: 18 }}
                  >
                    {fixture.participants[1].short_code ||
                      fixture.participants[1].name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
