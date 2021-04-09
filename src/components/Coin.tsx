import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";

import { colors } from "../config/colors";
import { generateImageURL, formatMoney } from "../utils";
import { addCrypto, deleteCrypto } from "../actions/crypto";
import { StateProps } from "../types/main";

export const Coin = ({ data }: any) => {
  const { watchList } = useSelector((state: StateProps) => state.crypto);

  const isWatched = (id: string) => {
    const found = watchList.find((wl: any) => wl.id === id);

    if (found) {
      return true;
    }
    return false;
  };

  const { id, name, symbol, metrics } = data;

  const dispatch = useDispatch();

  const { price_usd, percent_change_usd_last_1_hour } = metrics.market_data;

  const generateMoneyColor = () => {
    if (percent_change_usd_last_1_hour < 0) {
      return styles.priceLow;
    }
    return styles.priceUp;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 35, height: 35, alignSelf: "center" }}
          source={{ uri: generateImageURL(id) }}
        />
        <View
          style={{
            paddingLeft: 7,
            width: 150,
            justifyContent: "center",
          }}>
          <Text style={styles.coinName}>{name}</Text>
          <Text style={{ fontSize: 16, color: "#5b686e" }}>{symbol}</Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[{ fontSize: 17 }, generateMoneyColor()]}>
                {formatMoney(price_usd)}
              </Text>
              <Icon
                name={
                  percent_change_usd_last_1_hour < 0 ? "arrowdown" : "arrowup"
                }
                style={[
                  { fontSize: 16 },
                  { alignSelf: "center" },
                  generateMoneyColor(),
                ]}
              />
            </View>
            <Text
              style={{ color: "#5b686e", textAlign: "right", paddingRight: 5 }}>
              {percent_change_usd_last_1_hour.toFixed(5)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={
              !isWatched(id)
                ? () => dispatch(addCrypto(data))
                : () => dispatch(deleteCrypto(id))
            }>
            <Icon
              name="heart"
              color={isWatched(id) === true ? "red" : "white"}
              style={{
                alignSelf: "center",
                fontSize: 24,
                paddingLeft: 5,
                paddingVertical: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "#f4f3f3",
    paddingVertical: 15,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
  },
  imageContainer: {
    flexDirection: "row",
    maxWidth: 50,
    flex: 1,
  },
  coinName: {
    fontSize: 18,
    fontWeight: "700",
  },
  priceUp: {
    color: colors.cyan,
  },
  priceLow: {
    color: "red",
  },
  arrow: {
    alignSelf: "center",
  },
});
