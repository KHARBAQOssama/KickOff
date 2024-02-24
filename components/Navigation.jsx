import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Navigation = () => {
  const router = useRouter();
  const globalParams = useGlobalSearchParams();
  console.log(globalParams);
  const LocalParams = useLocalSearchParams();
  console.log(LocalParams);
  const navigateToScreen = (screenName) => {
    router.push(screenName);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#000000",
        padding: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => navigateToScreen("Home")}
        style={{ padding: 8}}
      >
        <View style={{alignItems:"center", gap:5}}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/icons/home.png")}
          />
          <Text style={{ color: "#00B8FF" , fontWeight:600, fontSize:16 }}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen("Players")}
        style={{ padding: 8}}
      >
        <View style={{alignItems:"center", gap:5}}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/icons/soccer-player.png")}
          />
          <Text style={{ color: "#00B8FF" , fontWeight:600, fontSize:16 }}>players</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen("saved-games")}
        style={{ padding: 8}}
      >
        <View style={{alignItems:"center", gap:5}}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/icons/passion.png")}
          />
          <Text style={{ color: "#00B8FF" , fontWeight:600, fontSize:16 }}>Favorite</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;
