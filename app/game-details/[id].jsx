import { LinearGradient } from "expo-linear-gradient";
import {  Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { formatDateTime } from "../../src/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame } from "../../src/features/global.slice";

const GameDetails = () => {
  const dispatch = useDispatch();
  const { gameDetails } = useSelector((state) => state.global);
  const { id } = useLocalSearchParams();
  useEffect(() => {
    if (id) dispatch(fetchGame(id));
  }, [id]);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#181829", paddingBottom: 20 }}
    >
      <Stack.Screen
        options={{
          headerTitle: gameDetails ? gameDetails.name : "",
          headerStyle: { backgroundColor: "#181829" },
          headerTintColor: "white",
        }}
      />
      {gameDetails && (
        <>
          <ScrollView style={{ flex: 1, paddingHorizontal: 30 }}>
            <View
              style={{
                height: 200,
                backgroundColor: "#14274C",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ marginBottom: 15 }}>
                <LinearGradient
                  colors={["#F4A58A", "#ED6B4E"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    paddingHorizontal: 4,
                    paddingVertical: 8,
                    borderRadius: 18,
                    width: 150,
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: gameDetails.league.image_path }}
                  />
                  <Text>{gameDetails.league.name}</Text>
                </LinearGradient>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 25,
                }}
              >
                <Image
                  style={{ height: 75, width: 75 }}
                  source={{ uri: gameDetails.participants[0].image_path }}
                />
                <View style={{ alignItems: "center" }}>
                  <Text
                    numberOfLines={1}
                    style={{ color: "#FD4A54", fontWeight: 700, fontSize: 16 }}
                  >
                    {formatDateTime(gameDetails.starting_at)[1]}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: "#ADADAD", fontWeight: 500 }}
                  >
                    {formatDateTime(gameDetails.starting_at)[0]}
                  </Text>
                </View>
                <Image
                  style={{ height: 75, width: 75 }}
                  source={{ uri: gameDetails.participants[1].image_path }}
                />
              </View>
              <Text
                numberOfLines={1}
                style={{ color: "#ADADAD", fontWeight: 500, marginTop: 16 }}
              >
                {gameDetails.venue.name}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  paddingTop: 10,
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                Lineups
              </Text>
            </View>
            <View style={{}}>
              {gameDetails.lineups.length != 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 20,
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <View style={{}}>
                    {gameDetails.lineups.map((lineup) => {
                      if (lineup.team_id == gameDetails.participants[0].id) {
                        return (
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 8,
                              padding: 5,
                              paddingHorizontal: 10,
                              backgroundColor: "#1818FF30",
                              marginBottom: 8,
                              borderRadius: 10,
                            }}
                          >
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                              }}
                              source={{ uri: lineup.player.image_path }}
                            />
                            <Text
                              numberOfLines={1}
                              style={{
                                color: "white",
                                textAlign: "right",
                                width: 100,
                              }}
                            >
                              {lineup.player.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    })}
                  </View>
                  <View style={{}}>
                    {gameDetails.lineups.map((lineup) => {
                      if (lineup.team_id == gameDetails.participants[1].id) {
                        return (
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 8,
                              padding: 5,
                              paddingHorizontal: 10,
                              backgroundColor: "#1818FF30",
                              marginBottom: 8,
                              borderRadius: 10,
                            }}
                          >
                            <Text
                              numberOfLines={1}
                              style={{
                                color: "white",
                                textAlign: "left",
                                width: 100,
                              }}
                            >
                              {lineup.player.name}
                            </Text>
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                              }}
                              source={{ uri: lineup.player.image_path }}
                            />
                          </TouchableOpacity>
                        );
                      }
                    })}
                  </View>
                </View>
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "blue",
                    paddingTop: 10,
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  No data Available
                </Text>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default GameDetails;
