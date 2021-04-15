import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Coin } from "../components";
import { colors } from "../config/colors";
import { StateProps } from "../types/main";

export const WatchList = () => {
  const { watchList } = useSelector((state: StateProps) => state.crypto);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Watch List</Text>
      <FlatList
        style={{ paddingVertical: 15 }}
        data={watchList}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <Coin data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dcdddd",
    flex: 1,
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.purple,
  },
});
