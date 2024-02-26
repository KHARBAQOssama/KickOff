import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { useEffect, useState } from "react";
import { fetchPlayers } from "../../src/features/global.slice";
import { FlatList, ScrollView } from "react-native";

const index = ({ searchStatement }) => {
  const dispatch = useDispatch();
  const { players } = useSelector((state) => state.global);
  const [playersSearched, setPlayersSearched] = useState([]);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, []);
  useEffect(() => {
    if (searchStatement != "") {
      let searchResult = players.filter((item) =>
        item.name.toLowerCase().includes(searchStatement.toLowerCase())
      );
      setPlayersSearched(searchResult);
    }
  }, [searchStatement]);
  return (
    <ScrollView style={{ padding: 24 }}>
      {searchStatement == "" ? (
        <>
          <FlatList
            data={players}
            renderItem={({ item }) => <Card player={item} />}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <>
          <FlatList
            data={playersSearched}
            renderItem={({ item }) => <Card player={item} />}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </ScrollView>
  );
};

export default index;
