import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ErrorPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Oops! Something went wrong.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
});

export default ErrorPage;
