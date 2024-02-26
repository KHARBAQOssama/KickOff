import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatDateTime } from "../../../src/utils/functions";


const CardContent = ({fixture}) => {
    const router = useRouter();
  return (
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
        {fixture.participants[0].short_code || fixture.participants[0].name}
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
      <Text numberOfLines={1} style={{ color: "#ADADAD", fontWeight: 500 }}>
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
        {fixture.participants[1].short_code || fixture.participants[1].name}
      </Text>
    </View>
  </TouchableOpacity>
  )
}

export default CardContent