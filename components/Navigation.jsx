import { useRouter, usePathname } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const iconMap = {
  home: require("../assets/icons/home.png"),
  players: require("../assets/icons/soccer-player.png"),
  favorites: require("../assets/icons/passion.png"),
};

const NavItem = ({ target, iconName, name, path }) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  const navigateToScreen = (screenName) => {
    router.push(screenName);
  };
  return (
    <TouchableOpacity
      onPress={() => navigateToScreen(target)}
      style={{
        padding: 8,
        backgroundColor: path == pathname ? "#00B8" : "#181829",
        width: 100,
        borderRadius: 22,
      }}
    >
      <View style={{ alignItems: "center", gap: 5 }}>
        <Image style={{ width: 30, height: 30 }} source={iconMap[iconName]} />
        <Text style={{ color: "#00B8FF", fontWeight: 600, fontSize: 16 }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Navigation = () => {
  const pathname = usePathname();
  if (pathname == "/") return <></>;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#000000",
        padding: 10,
      }}
    >
      <NavItem target={"Home"} iconName={"home"} name={"Home"} path={"/Home"} />
      <NavItem
        target={"Players"}
        iconName={"players"}
        name={"Players"}
        path={"/Players"}
      />
      <NavItem
        target={"saved-games"}
        iconName={"favorites"}
        name={"Favorites"}
        path={"/saved-games"}
      />
    </View>
  );
};

export default Navigation;
