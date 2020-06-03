import * as React from "react";
import { Text, View, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Registration from "./screens/Registration";
import Edit from "./screens/Edit";
import Identify from "./screens/Identify";
import Constants from "expo-constants";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name === "Register") {
              iconName = "ios-add-circle";
            } else if (route.name === "Identify") {
              iconName = "ios-qr-scanner";
            } else if (route.name === "Edit") {
              iconName = "ios-hammer";
            }
            return <Ionicons name={iconName} size={25} color={"white"} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#00adb5",
          inactiveTintColor: "white",
          style: { backgroundColor: "#393e46" },
        }}
      >
        <Tab.Screen name="Register" component={Registration} />
        <Tab.Screen name="Identify" component={Identify} />
        <Tab.Screen name="Edit" component={Edit} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
