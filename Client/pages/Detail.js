import React from "react";
import { Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ITEM_BY_ID } from "../query/query";
import { Card, Button, Icon, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../RandomStuff/Loading";
import ErrorPage from "../RandomStuff/Error";

const Detail = ({ route }) => {
  const { itemId } = route.params;

  const { loading, error, data } = useQuery(GET_ITEM_BY_ID, {
    variables: { itemId },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const item = data.getItemById;

  const handleOpenURL = () => {
    Linking.openURL("https://genkisushi.co.id/delivery-services/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#FF5F6D", "#FFC371"]} style={styles.gradient}>
        <Card containerStyle={styles.card}>
          <Card.Title h3 style={styles.centerText}>
            {item?.name}
          </Card.Title>
          <Card.Divider />
          <Avatar
            rounded
            source={{ uri: item?.imgUrl }}
            size="xlarge"
            placeholderStyle={{ backgroundColor: "white" }}
            containerStyle={styles.avatarContainer}
          />
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.centerText]}>
              {item?.description}
            </Text>
            <Text style={[styles.price, styles.centerText]}>
              Price: {item?.price}
            </Text>
          </View>
          <Button
            icon={<MaterialCommunityIcons name="web" size={24} color="white" />}
            title=" Open Website"
            buttonStyle={styles.button}
            onPress={handleOpenURL}
          />
        </Card>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5F6D",
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 20,
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FFC371",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  price: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  centerText: {
    textAlign: "center",
    color: "#333",
  },
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  textContainer: {
    paddingHorizontal: 20,
  },
});

export default Detail;
