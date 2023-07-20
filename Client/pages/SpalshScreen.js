import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.centralparkjakarta.com/wp-content/uploads/2017/11/Genki-Sushi-logo.png",
        }}
        style={styles.logo}
        resizeMode="contain" // ensure logo isn't cropped
      />
      <Text style={styles.text}>Sushi For everyone!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0b639",
  },
  logo: {
    width: 150,
    height: 150,
    aspectRatio: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default SplashScreen;
