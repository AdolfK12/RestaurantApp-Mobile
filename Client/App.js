import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import {
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "./pages/SpalshScreen";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import useLongPress from "./RandomStuff/LongPress";
import client from "./config/client";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isStart, setIsStart] = useState(true);

  const { modalVisible, handleLongPress, handlePressOut } = useLongPress();

  useEffect(() => {
    setTimeout(() => {
      setIsStart(false);
    }, 3000);
  }, []);

  if (isStart) {
    return <SplashScreen />;
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <Image
                source={{
                  uri: "https://media.tenor.com/t5EAr7apbRMAAAAM/the-rock-eyebrow.gif",
                }}
                style={styles.modalImage}
              />
            </Modal>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                  name="Our Menu"
                  component={Main}
                  options={{ headerShown: true }}
                />
                <Stack.Screen
                  name="Details"
                  component={Detail}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  modalImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
