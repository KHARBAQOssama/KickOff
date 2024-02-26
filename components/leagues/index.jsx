import { FlatList, View } from "react-native"
import Card from "./Card"

const index = ({leagues}) => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
        {leagues.length != 0 && (
          <FlatList
            data={leagues}
            renderItem={({ item }) => (
              <Card league={item}/>
            )}  
            keyExtractor={(item) => item.id}
            contentContainerStyle={{}}
            horizontal
          />
        )}
      </View>
  )
}

export default index