import { ScrollView } from "react-native";
import Card from "./Card";

const index = ({games}) => {
  return (
    <ScrollView style={{ padding: 25 }}>
        {games.length != 0 &&
          games.map((fixture) => (
            <Card key={fixture.id} fixture={fixture}/>
          ))}
      </ScrollView>
  )
}

export default index