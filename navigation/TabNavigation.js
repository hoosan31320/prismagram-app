import React from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (initialRoute, name, customConfig) => (
    <Stack.Navigator>
      <Stack.Screen name={name} component={initialRoute} 
        options={{ ...customConfig, headerStyle: { ...stackStyles } }} 
      />
    </Stack.Navigator>
);

export default () => (
  <Tab.Navigator 
    tabBarOptions={{
      showLabel: false,
      style: {
        backgroundColor: "#FAFAFA"
      }
    }}
  >
    <Tab.Screen name="Home" options={{tabBarIcon: ({ focused }) => (
        <NavIcon
          focused={focused} size={24}
          name={Platform.OS === "ios" ? 'ios-home' : 'md-home'}
        />
      )
    }}>
      { () => stackFactory(Home, "Home", {headerRight: () => <MessagesLink />, 
                                          headerTitle: <NavIcon name="logo-instagram" size={36} />
      })}   
    </Tab.Screen>
    <Tab.Screen name="Search" options={{tabBarIcon: ({ focused }) => (
        <NavIcon
          focused={focused} size={24}
          name={Platform.OS === "ios" ? 'ios-search' : 'md-search'}
        />
      )
    }}>
      { () => stackFactory(Search, "Search", {title: "Search"}) }
    </Tab.Screen>
    <Tab.Screen name="Add" component={View}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate("PhotoNavigation");
        }
      })}
      options={{
        tabBarIcon: () => (
          <NavIcon
            focused={false} size={32}
            name={
              Platform.OS === "ios" 
                ? 'ios-add-circle-outline' 
                : 'md-add-circle-outline'
            }
          />
        )
      }}
    />
    <Tab.Screen name="Notifications" options={{tabBarIcon: ({ focused }) => (
        <NavIcon
          focused={focused} size={24}
          name={Platform.OS === "ios" ? 'ios-heart' : 'md-heart'}
        />
      )
    }}>
      { () => stackFactory(Notifications, "Notifications", {title: "Notifications"}) }
    </Tab.Screen>
    <Tab.Screen  name="Profile" options={{ tabBarIcon: ({ focused }) => (
        <NavIcon
          focused={focused} size={24}
          name={Platform.OS === "ios" ? 'ios-person' : 'md-person'}
        />
      )
    }}>
      { () => stackFactory(Profile, "Profile", {title: "Profile"}) }
    </Tab.Screen>
  </Tab.Navigator>
);