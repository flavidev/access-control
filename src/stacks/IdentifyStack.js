import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TypeIdScreen from "../screens/IdentifyScreens/TypeIdScreen";
import CheckFaceScreen from "../screens/IdentifyScreens/CheckFaceScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen/UserDetailsScreen"

const Stack = createStackNavigator();

function IdentifyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TypeIdScreen" component={TypeIdScreen}
      options={{
        title: 'Type User ID',
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
      <Stack.Screen name="CheckFaceScreen" component={CheckFaceScreen} 
      options={{
        title: 'Face Scanner',
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
        name="UserDetailsScreen"
        component={UserDetailsScreen}
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

export default IdentifyStack;
