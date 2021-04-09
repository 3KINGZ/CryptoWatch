import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Home, WatchList } from "../screens";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#5a5cbf",
        inactiveTintColor: "grey",
        labelStyle: {
          fontSize: 16,
        },
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="format-list-bulleted" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="eye" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
