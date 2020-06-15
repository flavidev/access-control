import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationFormScreen from "../screens/RegisterScreens/RegistrationFormScreen";
import RegisterPhotoScreen from "../screens/RegisterScreens/RegisterPhotoScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen/UserDetailsScreen";

const Stack = createStackNavigator();

function RegisterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegistrationFormScreen"
        component={RegistrationFormScreen}
        options={{
          title: 'Registration Form',
          headerTitleAlign:"center",
          headerStyle: {
            backgroundColor: '#393e46',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: "500",    
          },
        }}
      />
      <Stack.Screen
        name="RegisterPhotoScreen"
        component={RegisterPhotoScreen}
        options={{
          title: 'Registration Photo',
          headerTitleAlign:"center",
          headerStyle: {
            backgroundColor: '#393e46',
            
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: "500",    
          },
        }}
      />
      <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen}
      options={{
        title: 'User Details',
        headerTitleAlign:"center",
        headerStyle: {
          backgroundColor: '#393e46',
          
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: "500",    
        },
      }}
      />
    </Stack.Navigator>
  );
}

export default RegisterStack;
