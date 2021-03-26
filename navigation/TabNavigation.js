import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}
        options={{ tabBarIcon: ({ focused, size, color }) => {} }}
      />
      <Tab.Screen name="Search" component={Search}
        options={{ tabBarIcon: ({ focused, size, color }) => {} }}
      />
      <Tab.Screen name="View" component={View}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            console.log("Add");
          },
        })}
      />
      <Tab.Screen name="Notifications" component={Notifications}
        options={{ tabBarIcon: ({ focused, size, color }) => {} }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{ tabBarIcon: ({ focused, size, color }) => {} }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);