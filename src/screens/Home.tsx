import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { StateProps } from "../types/main";

import { Coins } from "../components";
import { getCrypto } from "../actions/crypto";
import { colors } from "../config/colors";

export const Home = () => {
  const dispatch = useDispatch();

  const { cryptos, message, loading } = useSelector(
    (state: StateProps) => state.crypto,
  );

  useEffect(() => {
    dispatch(getCrypto());
  }, []);

  if (loading && !cryptos.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.purple} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {message ? (
        <Text style={styles.errorMessage}>{message}</Text>
      ) : (
        <Coins
          cryptos={cryptos}
          onRefresh={() => dispatch(getCrypto())}
          refreshing={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    flex: 1,
  },
  errorMessage: {
    fontSize: 24,
    fontWeight: "700",
    color: "grey",
    textAlign: "center",
    paddingVertical: 100,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
