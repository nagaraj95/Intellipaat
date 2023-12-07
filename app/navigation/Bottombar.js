/* eslint-disable react/prop-types */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeI from "../assets/icons/home1.svg";
import Profileicon from "../assets/icons/user.svg";
import Course from '../assets/icons/course.svg';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
// screen imports
import MyCourse from '../screens/MyCourse'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import colors from "../colors";


const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {

  // function to get tab icon
  const getIcon = (currentIndex, size, color) => {
    switch (currentIndex) {
      case 0:
        return <HomeI width={size} height={size} fill={color} />;
      case 1:
        return <Course width={size} height={size} fill={color} />;
      case 2:
        return <Profileicon width={size} height={size} fill={color} />;
      default:
        return <HomeI width={size} height={size} fill={color} />;
    }
  };

  // function to get label
  const getLabel = (menuOption, menuRoute) => {
    let label;
    if (menuOption.tabBarLabel !== undefined) label = menuOption.tabBarLabel;
    else if (menuOption.title !== undefined) label = menuOption.title;
    else label = menuRoute.name;
    return label;
  };

  return (
    <Animated.View
      style={{
        ...styles.menucontainer,
        zIndex: 2,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const iconSize = "25%";
        const iconColor = isFocused ? colors.HEADER : colors.SMOKE_WHITE;

        return (
          <TouchableOpacity
            key={`nav${index}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => onPress()}
            style={styles.menubox}
          >
            {getIcon(index, iconSize, iconColor)}
            <Text style={[styles.menutext, { color: iconColor }]}>
              {getLabel(options, route)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const Bottomtabs = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="home"
        component={Home}

      />
      <Tab.Screen
        name="mycourse"
        component={MyCourse}

      />
      <Tab.Screen
        name="profile"
        component={Profile}

      />
    </Tab.Navigator>
  );
};

export default Bottomtabs;

// component styles
const styles = StyleSheet.create({
  menutext: {
    fontSize: 12,
    textTransform: "capitalize",
    marginTop: 5,
  },
  menubox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Platform.OS == "ios" ? 10 : 0,
  },
  dashinidcator: {
    height: 3,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 87,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  menucontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 90,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
