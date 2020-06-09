import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import RegisterForm from "../src/components/RegisterForm"
import PhotoBooth from "../src/components/PhotoBooth"

const Stack = createStackNavigator();

function Register() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="PhotoBooth" component={PhotoBooth} />
    </Stack.Navigator>
  );
}

export default Register;