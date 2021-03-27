import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default () => (
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
          e.preventDefault();
          navigation.navigate("PhotoNavigation");
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
);