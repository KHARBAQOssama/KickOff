import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { calculateAge } from "../../src/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayer } from "../../src/features/global.slice";

const PlayerDetails = () => {
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
                backgroundColor: "#b2dafb30",
                padding: 8,
                paddingHorizontal: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginBottom: 16 }}
                source={require("../../assets/icons/age.png")}
              />
              <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
                {calculateAge(playerDetails.date_of_birth)} yo
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#b2dafb30",
                padding: 8,
                paddingHorizontal: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginBottom: 16 }}
                source={require("../../assets/icons/height.png")}
              />
              <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
                {playerDetails.height} cm
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#b2dafb30",
                padding: 8,
                paddingHorizontal: 16,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 30, width: 30, marginBottom: 16 }}
                source={require("../../assets/icons/weight.png")}
              />
              <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
                {playerDetails.weight} kg
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default PlayerDetails;
