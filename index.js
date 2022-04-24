/**
 * @format
 */
import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import store from './app/store'
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

// console.disableYellowBox = true

// // persisted store
 let persistor = persistStore(store);



const RootComponent = () => {
  return (
     <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <App />
       </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
