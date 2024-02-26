import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"

const Card = ({player}) => {
    const router = useRouter();
  return (
    <TouchableOpacity onPress={()=>{
        router.push(`player-details/${player.id}`)
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
          source={{ uri: player.image_path }}
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
            {player.name}
          </Text>
          <Text style={{color:"white"}}>{player.position?.name}</Text>
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
            source={{ uri: player.country.image_path }}
          />
          <Text style={{ color: "white", fontWeight: 600 }}>
            {player.country.iso3 || player.country.iso2}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Card