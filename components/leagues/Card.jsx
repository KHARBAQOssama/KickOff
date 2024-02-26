import { useDispatch, useSelector } from "react-redux";
import { setActiveLeague } from "../../src/features/global.slice";
import CardContent from "./CardContent";
import { TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Card = ({ league }) => {
  const dispatch = useDispatch();
  const { activeLeague } = useSelector((state) => state.global);
  return (
    <TouchableOpacity
      style={{
        margin: 10,
        backgroundColor: "#222232",
        borderRadius: 18,
      }}
      onPress={() => {
        dispatch(setActiveLeague(league.id));
      }}
    >
      {league.id == activeLeague ? (
        <LinearGradient
          colors={["#F4A58A", "#ED6B4E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 18,
          }}
        >
          <CardContent league={league} />
        </LinearGradient>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 18,
          }}
        >
          <CardContent league={league} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Card;
