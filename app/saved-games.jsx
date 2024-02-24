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
const SavedGames = () => {
  const router = useRouter();
  const [fixtures, setFixtures] = useState([]);
  const [savedGames, setSavedGames] = useState([]);
  const [activeLeague, setActiveLeague] = useState(null);
  const removeGame = async (gameId) => {
    try {
      const updatedGames = savedGames.filter((id) => id !== gameId);
      const updatedFixtures = fixtures.filter((item) => item.id != gameId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGames));
      setSavedGames(updatedGames);
      setFixtures(updatedFixtures);
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
  useEffect(() => {
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
        const savedFixtures = response.data.data.filter((item) =>
          savedGames.includes(item.id)
        );
        setFixtures(savedFixtures);
      });
  }, [savedGames]);
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
      <ScrollView style={{ padding: 25 }}>
        {fixtures.length == 0 ? (
          <>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ height: 150, width: 200 }}
                source={require("../assets/icons/empty-folder.png")}
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
                  removeGame(fixture.id);
                }}
                style={{ position: "absolute", top: 16, right: 16 }}
              >
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require("../assets/icons/red-heart.png")}
                />
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
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedGames;
