import axios from "axios";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Players = () => {
  const router = useRouter();
  const [players, setPlayers] = useState([]);
  const [playersSearched, setPlayersSearched] = useState([]);
  const [searchStatement, setSearchStatement] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.sportmonks.com/v3/football/players?include=country;position",
        {
          headers: {
            Authorization:
              "tYgX0otkxc857iGQk2dAVFYOiNCNGi9Qr2sUH40UVpHphNDjdeIdXvrRwb4I",
          },
        }
      )
      .then((response) => {
        console.log(response.data.data[0].position.name);
        setPlayers(response.data.data);
      });
  }, []);
  useEffect(() => {
    if (searchStatement != "") {
      console.log(searchStatement);
      let searchResult = players.filter((item) =>
        item.name.toLowerCase().includes(searchStatement.toLowerCase())
      );
      setPlayersSearched(searchResult);
    }
  }, [searchStatement]);
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
      <ScrollView style={{ padding: 24 }}>
        {searchStatement == "" ? (
          <>
            <FlatList
              data={players}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{
                    router.push(`player-details/${item.id}`)
                }} style={{ marginBottom: 12 }}>
                  <View
                    style={{
                      backgroundColor: "black",
                      padding: 16,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 14,
                        backgroundColor: "white",
                      }}
                      source={{ uri: item.image_path }}
                    />
                    <View>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontWeight: 500,
                          width:200,
                          marginBottom:4,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text style={{color:"white"}}>{item.position?.name}</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: "auto",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Image
                        style={{ width: 30, height: 20, borderRadius: 5 }}
                        source={{ uri: item.country.image_path }}
                      />
                      <Text style={{ color: "white", fontWeight: 600 }}>
                        {item.country.iso3 || item.country.iso2}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        ) : (
          <>
            <FlatList
              data={playersSearched}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{
                    router.push(`player-details/${item.id}`)
                }} style={{ marginBottom: 12 }}>
                  <View
                    style={{
                      backgroundColor: "black",
                      padding: 16,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 14,
                        backgroundColor: "white",
                      }}
                      source={{ uri: item.image_path }}
                    />
                    <View>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontWeight: 500,
                          width:200,
                          marginBottom:4,
                          flex:1
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text style={{color:"white"}}>{item.position?.name}</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: "auto",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Image
                        style={{ width: 30, height: 20, borderRadius: 5 }}
                        source={{ uri: item.country.image_path }}
                      />
                      <Text style={{ color: "white", fontWeight: 600 }}>
                        {item.country.iso3 || item.country.iso2}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Players;
