import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { Coin } from "./Coin";

interface CoinsProps {
  cryptos: any;
  onRefresh: () => {};
  refreshing: boolean;
}

export const Coins = ({ cryptos, onRefresh, refreshing }: CoinsProps) => {
  return (
    <FlatList
      style={styles.container}
      data={cryptos}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => <Coin data={item} />}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
});
