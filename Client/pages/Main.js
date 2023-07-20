import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../query/query";
import { Card, Button, Icon, Image } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../RandomStuff/Loading";
import ErrorPage from "../RandomStuff/Error";

const Main = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const sushiData = [...data?.items].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: `${item.imgUrl}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.overlayText}>{item.name}</Text>
      <Card containerStyle={styles.card}>
        <Text style={styles.text}>{item.description}</Text>
        <Button
          icon={
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={24}
              color="white"
            />
          }
          title=" Go to Detail"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Details", { itemId: item.id })}
        />
      </Card>
    </View>
  );

  return (
    <LinearGradient colors={["#FF5F6D", "#FFC371"]} style={styles.gradient}>
      <FlatList
        data={sushiData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 250,
  },
  overlayText: {
    position: "absolute",
    top: "40%",
    width: "100%",
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
  },
  card: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  text: {
    marginBottom: 10,
    padding: 15,
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#388e3c",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    elevation: 5,
    alignSelf: "stretch",
  },
});

export default Main;
