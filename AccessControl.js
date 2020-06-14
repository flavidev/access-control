import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import RegisterStack from "./src/stacks/RegisterStack";
import IdentifyStack from "./src/stacks/IdentifyStack";
import EditStack from "./src/stacks/EditStack";

const Tab = createBottomTabNavigator();

export default function AccessControl() {
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
              iconName = "ios-list-box";
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
        <Tab.Screen name="Register" component={RegisterStack} />
        <Tab.Screen name="Identify" component={IdentifyStack} />
        <Tab.Screen name="Edit" component={EditStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
