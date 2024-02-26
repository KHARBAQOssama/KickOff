import { Stack, useRouter } from "expo-router";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181829" }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Image source={require("../assets/images/landingmbape.png")} />
      </View>
      <View style={{ paddingVertical: 30 , paddingHorizontal:40}}>
        <Text style={{ color: "white", fontSize: 42, fontWeight: 700 }}>
          Dicover all about Football
        </Text>
        <Text
          style={{
            color: "#D1D1D1",
            width: 250,
            textAlign: "justify",
            paddingTop: 10,
          }}
        >
          Explore football fixtures, match results, and team insights. What are
          you waiting for? Let's kick off the excitement!
        </Text>
      </View>
      <View style={{ paddingTop: 20, paddingHorizontal: 40 }}>
        <TouchableOpacity style={{ backgroundColor: "#246BFD", padding:16, borderRadius:16, alignItems:"center" }} onPress={()=>{router.push('Home')}}>
          <Text style={{color:"white", fontSize:18, fontWeight: 500,}}>Get Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default index;
