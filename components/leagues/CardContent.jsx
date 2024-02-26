import { Image, Text } from "react-native";

const CardContent = ({league}) => {
  return (
    <>
      <Image
        style={{ height: 25, width: 25 }}
        source={{ uri: league.image_path }}
      />
      <Text style={{ fontWeight: 500, color: "white", fontSize: 18 }}>
        {league.name}
      </Text>
    </>
  );
};

export default CardContent;
