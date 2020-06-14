import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationFormScreen from "../screens/RegisterScreens/RegistrationFormScreen";
import RegisterPhotoScreen from "../screens/RegisterScreens/RegisterPhotoScreen";
import CreateUserScreen from "../screens/RegisterScreens/CreateUserScreen";

const Stack = createStackNavigator();

function RegisterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegistrationFormScreen"
        component={RegistrationFormScreen}
      />
      <Stack.Screen
        name="RegisterPhotoScreen"
        component={RegisterPhotoScreen}
      />
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
    </Stack.Navigator>
  );
}

export default RegisterStack;
