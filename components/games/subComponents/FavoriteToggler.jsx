import { Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleGameSaving } from "../../../src/features/global.slice";

const icons = {
  saved: require("../../../assets/icons/red-heart.png"),
  default: require("../../../assets/icons/heart.png"),
};

const FavoriteToggler = ({ fixtureId }) => {
  const dispatch = useDispatch();
  const { savedGames } = useSelector((state) => state.global);
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(toggleGameSaving(fixtureId));
      }}
      style={{ position: "absolute", top: 16, right: 16 }}
    >
      <Image
        style={{ height: 24, width: 24 }}
        source={icons[savedGames.includes(fixtureId) ? "saved" : "default"]}
      />
    </TouchableOpacity>
  );
};

export default FavoriteToggler;
