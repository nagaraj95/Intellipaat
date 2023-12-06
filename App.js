/* eslint-disable no-undef */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { createNavigationContainerRef } from "@react-navigation/native";
import { StatusBar } from 'react-native'

export const navigationRef = createNavigationContainerRef();


// axios configs
axios.defaults.baseURL = "https://bigdataonlinetraining.us/academy/mobile_apis/V1/courses.php?";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["accept-language"] = "en";
axios.defaults.timeout = 10000;

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.params = config.params || {};
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// end of axios config

if (__DEV__) {
  console.warn = () => null;
  console.error = () => null;
}

// screen imports
import Bottomtabs from "./app/navigation/Bottombar";
import colors from "./app/colors";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <StatusBar
        animated={true}
        backgroundColor={colors.HEADER} />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        headerMode="none"
      >
        <Stack.Screen
          name="tabs"
          component={Bottomtabs}
          options={{ gestureEnabled: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
