import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";

import { colors } from "../config/colors";
import { generateImageURL, formatMoney, write } from "../utils";
import { addCrypto, deleteCrypto } from "../actions/crypto.action";
import { StateProps } from "../types/main";

export const Coin = ({ data }: any) => {
  const dispatch = useDispatch();
  const { watchList } = useSelector((state: StateProps) => state.crypto);

  const { id, name, symbol, metrics } = data;
  const { price_usd, percent_change_usd_last_1_hour } = metrics.market_data;

  useEffect(() => {
    write("watchList", watchList);
  }, [watchList]);

  const isWatched = (id: string) => {
    const found = watchList.find((wl: any) => wl.id === id);

    if (found) {
      return true;
    }
    return false;
  };

  const generateMoneyColor = () => {
    if (percent_change_usd_last_1_hour < 0) {
      return styles.priceLow;
    }
    return styles.priceUp;
  };

  const _addCrypto = async (data: {}) => {
    dispatch(addCrypto(data));
  };

  const _deleteCrypto = async (id: string) => {
    dispatch(deleteCrypto(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: generateImageURL(id) }} />
        <View style={styles.nameContainer}>
          <Text style={styles.coinName}>{name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
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
                style={[styles.arrow, generateMoneyColor()]}
              />
            </View>
            <Text style={styles.percentChange}>
              {percent_change_usd_last_1_hour.toFixed(5)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={
              !isWatched(id) ? () => _addCrypto(data) : () => _deleteCrypto(id)
            }>
            <Icon
              name="heart"
              color={isWatched(id) === true ? "red" : "white"}
              style={styles.likeIcon}
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
  image: { width: 35, height: 35, alignSelf: "center" },
  nameContainer: {
    paddingLeft: 7,
    width: 150,
    justifyContent: "center",
  },
  coinName: {
    fontSize: 18,
    fontWeight: "700",
  },
  symbol: {
    fontSize: 16,
    color: colors.greyText2,
  },
  percentChange: {
    color: colors.greyText2,
    textAlign: "right",
    paddingRight: 5,
  },
  priceUp: {
    color: colors.cyan,
  },
  priceLow: {
    color: "red",
  },
  arrow: {
    alignSelf: "center",
    fontSize: 16,
  },
  likeIcon: {
    alignSelf: "center",
    fontSize: 24,
    paddingLeft: 5,
    paddingVertical: 10,
  },
});
