import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { formatDateTime } from "../../src/utils/functions";

const GameDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [fixture, setFixture] = useState();
  useEffect(() => {
    console.log(id);
    if (id) {
      axios
        .get(
          `https://api.sportmonks.com/v3/football/fixtures/${id}?include=league;participants;lineups;lineups.player;venue`,
          {
            headers: {
              Authorization:
                "tYgX0otkxc857iGQk2dAVFYOiNCNGi9Qr2sUH40UVpHphNDjdeIdXvrRwb4I",
            },
          }
        )
        .then((response) => {
          console.log(response);
          setFixture(response.data.data);
          // setActiveLeague(response.data.data[0].id);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#181829", paddingBottom: 20 }}
    >
      <Stack.Screen
        options={{
          headerTitle: fixture ? fixture.name : "",
          // headerShadowVisible: false,
          // headerBackVisible: false,
          //   headerShown: false,
          headerStyle: { backgroundColor: "#181829" },
          headerTintColor: "white",
        }}
      />
      {fixture && (
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
                    source={{ uri: fixture.league.image_path }}
                  />
                  <Text>{fixture.league.name}</Text>
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
                  source={{ uri: fixture.participants[0].image_path }}
                />
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
                <Image
                  style={{ height: 75, width: 75 }}
                  source={{ uri: fixture.participants[1].image_path }}
                />
              </View>
              <Text
                numberOfLines={1}
                style={{ color: "#ADADAD", fontWeight: 500, marginTop: 16 }}
              >
                {fixture.venue.name}
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
              {fixture.lineups.length != 0 ? (
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
                    {fixture.lineups.map((lineup) => {
                      if (lineup.team_id == fixture.participants[0].id) {
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
                    {fixture.lineups.map((lineup) => {
                      if (lineup.team_id == fixture.participants[1].id) {
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
