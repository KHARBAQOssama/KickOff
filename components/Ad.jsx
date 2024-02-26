import { Image, Linking, TouchableOpacity } from "react-native";

const Ad = () => {
  return (
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
  )
}

export default Ad