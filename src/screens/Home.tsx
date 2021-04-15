import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Coins } from "../components";
import { colors } from "../config/colors";
import { useOnLoad } from "../hooks";

export const Home = () => {
  const [loading, cryptos, message, offlineData, fetchCrypto] = useOnLoad();

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
        message && offlineData ? (
          <>
            <View style={styles.networkStatus}>
              <Text style={styles.networkStatusText}>
                No internet Connection? Reload
              </Text>
            </View>
            <Coins
              cryptos={offlineData}
              onRefresh={fetchCrypto}
              refreshing={loading}
            />
          </>
        ) : (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>{message}</Text>
            <Button title="Reload" onPress={fetchCrypto} />
          </View>
        )
      ) : (
        <Coins cryptos={cryptos} onRefresh={fetchCrypto} refreshing={loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    flex: 1,
  },
  errorMessageContainer: {
    paddingHorizontal: 10,
  },
  errorMessage: {
    fontSize: 24,
    fontWeight: "700",
    color: "grey",
    textAlign: "center",
    paddingVertical: 50,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  networkStatus: {
    backgroundColor: "black",
    paddingVertical: 5,
  },
  networkStatusText: {
    color: "white",
    textAlign: "center",
  },
});
