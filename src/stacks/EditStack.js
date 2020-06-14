import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserListScreen from "../screens/EditScreens/UserListScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen/UserDetailsScreen"
const Stack = createStackNavigator();

function EditStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserListScreen" component={UserListScreen} />
      <Stack.Screen
        name="UserDetailsScreen"
        component={UserDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default EditStack;
