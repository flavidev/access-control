import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TypeIdScreen from "../screens/IdentifyScreens/TypeIdScreen";
import CheckFaceScreen from "../screens/IdentifyScreens/CheckFaceScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen/UserDetailsScreen"

const Stack = createStackNavigator();

function IdentifyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TypeIdScreen" component={TypeIdScreen} />
      <Stack.Screen name="CheckFaceScreen" component={CheckFaceScreen} />
      <Stack.Screen
        name="UserDetailsScreen"
        component={UserDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default IdentifyStack;
