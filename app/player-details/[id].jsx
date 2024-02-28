import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { calculateAge } from "../../src/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayer } from "../../src/features/global.slice";

const PlayerDetails = () => {
  const positions = [
    "GK",
    "SW",
    "CB",
    "LCB",
    "RCB",
    "LB",
    "RB",
    "CDM",
    "CM",
    "LCM",
    "RCM",
    "LW",
    "RW",
    "CF",
    "ST",
    "LF",
    "RF",
  ];

  const playerPosition =
    positions[Math.floor(Math.random() * positions.length)];
  const dispatch = useDispatch();
  const { playerDetails } = useSelector((state) => state.global);
  const { id } = useLocalSearchParams();
  useEffect(() => {
    if (id) dispatch(fetchPlayer(id));
  }, [id]);
  return (
    <View style={{ flex: 1, backgroundColor: "#181829", paddingBottom: 20 }}>
      <Stack.Screen
        options={{
          headerTitle: playerDetails ? playerDetails.name : "",
          headerStyle: { backgroundColor: "#181829" },
          headerTintColor: "white",
        }}
      />
      {playerDetails && (
        <>
          <View
            style={{
              alignItems: "center",
              padding: 24,
              flexDirection: "row",
              gap: 24,
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "white",
                  flex: 1,
                }}
              >
                {playerDetails.name}
              </Text>
              <View
                style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
              >
                <Image
                  style={{ width: 40, height: 28, borderRadius: 8 }}
                  source={{ uri: playerDetails.country.image_path }}
                />
                <Text style={{ color: "white", fontSize: 18, fontWeight: 700 }}>
                  {playerDetails.country.iso3 || playerDetails.country.iso2}
                </Text>
              </View>
            </View>
            <Image
              style={{
                backgroundColor: "white",
                width: 140,
                height: 150,
                borderRadius: 32,
                marginLeft: "auto",
              }}
              source={{ uri: playerDetails.image_path }}
            />
          </View>
          <View
            style={{
              padding: 24,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#00B8",
                padding: 8,
                paddingHorizontal: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
                {calculateAge(playerDetails.date_of_birth)} yo
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#00B8",
                padding: 8,
                paddingHorizontal: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
                {playerDetails.height} cm
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#00B8",
                padding: 8,
                paddingHorizontal: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
                {playerDetails.weight} kg
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 24,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>Position</Text>
                <Text
                  style={{
                    color: "white",
                    backgroundColor: "#00b8",
                    fontSize: 18,
                    fontWeight: 600,
                    paddingHorizontal: 12,
                    padding: 4,
                    borderRadius: 3,
                  }}
                >
                  {playerPosition}
                </Text>
              </View>
              <View style={{ position: "relative" }}>
                <Image
                  style={{ borderRadius: 12 }}
                  source={require("../../assets/images/playing-field.jpg")}
                ></Image>
                <Image
                  style={[
                    {
                      width: 32,
                      height: 32,
                      borderRadius: 12,
                      backgroundColor: "white",
                      position: "absolute",
                    },
                    style.position[playerPosition],
                  ]}
                  source={{ uri: playerDetails.image_path }}
                />
              </View>
            </View>
            <View style={{ gap: 12 }}>
              <View
                style={{ position: "relative", padding: 20, paddingTop: 70 }}
              >
                <Image
                  style={{ borderRadius: 12, width: 140, height: 210 }}
                  source={require("../../assets/images/T-shirt.png")}
                ></Image>
                <Text style={{ position: "absolute", color: "white", fontSize:48,fontWeight:700, top:130, start:64, textAlign:"center" }}>
                  {Math.floor(Math.random() * 89) + 10}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default PlayerDetails;

const style = StyleSheet.create({
  position: {
    test: {
      bottom: 35,
      start: 15,
    },
    GK: {
      bottom: 6,
      start: 70,
    },
    SW: {
      bottom: 26,
      start: 70,
    },
    CB: {
      bottom: 26,
      start: 70,
    },
    LCB: {
      bottom: 26,
      start: 45,
    },
    RCB: {
      bottom: 26,
      start: 95,
    },
    LB: {
      bottom: 35,
      start: 15,
    },
    RB: {
      bottom: 35,
      start: 125,
    },
    CDM: {
      start: 70,
      bottom: 65,
    },
    CM: {
      bottom: 65,
      start: 70,
    },
    LCM: {
      bottom: 105,
      start: 30,
    },
    RCM: {
      bottom: 105,
      start: 110,
    },
    LW: {
      bottom: 155,
      start: 25,
    },
    RW: {
      bottom: 155,
      start: 115,
    },
    CF: {
      bottom: 135,
      start: 70,
    },
    ST: {
      bottom: 200,
      start: 70,
    },
    LF: {
      bottom: 190,
      start: 40,
    },
    RF: {
      bottom: 190,
      start: 100,
    },
  },
});
