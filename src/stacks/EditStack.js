import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserListScreen from "../screens/EditScreens/UserListScreen";
import SelectedUserDetailsScreen from "../screens/EditScreens/SelectedUserDetailsScreen";

const Stack = createStackNavigator();

function EditStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserListScreen" component={UserListScreen} />
      <Stack.Screen
        name="SelectedUserDetailsScreen"
        component={SelectedUserDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default EditStack;
