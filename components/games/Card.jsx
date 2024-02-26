import { View } from "react-native";
import FavoriteToggler from "./subComponents/FavoriteToggler";
import CardContent from "./subComponents/CardContent";

const Card = ({fixture}) => {
  return (
    <View
      style={{
        backgroundColor: "#14274C",
        height: 100,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        position: "relative",
      }}
      key={fixture.id}
    >
      <FavoriteToggler fixtureId={fixture.id}/>
      <CardContent fixture={fixture}/>
    </View>
  );
};

export default Card;
