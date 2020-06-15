import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserListScreen from "../screens/EditScreens/UserListScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen/UserDetailsScreen"
const Stack = createStackNavigator();

function EditStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserListScreen" component={UserListScreen}
      options={{
        title: 'Active users',
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

export default EditStack;
