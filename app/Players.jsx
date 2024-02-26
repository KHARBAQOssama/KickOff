import { Stack } from "expo-router";
import {  useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PlayersContainer from "../components/players"
const Players = () => {
  const [searchStatement, setSearchStatement] = useState("");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181829",
        paddingBottom: 25,
        paddingTop: 48,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
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
      <View style={{ paddingHorizontal: 24, flexDirection: "row", gap: 8 }}>
        <TextInput
          onChangeText={(text) => setSearchStatement(text)}
          style={{
            color: "white",
            backgroundColor: "black",
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 12,
            fontSize: 16,
            borderRadius: 12,
          }}
          placeholder="Search Player By Name"
          placeholderTextColor={"#b2dafb60"}
        ></TextInput>
        <TouchableOpacity
          style={{
            backgroundColor: "#b2dafb30",
            padding: 12,
            borderRadius: 12,
          }}
        >
          <Image
            style={{ width: 22, height: 22 }}
            source={require("../assets/icons/search.png")}
          />
        </TouchableOpacity>
      </View>
      <PlayersContainer searchStatement={searchStatement} />
    </View>
  );
};

export default Players;
