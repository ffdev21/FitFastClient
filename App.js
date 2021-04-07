import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { LogBox } from "react-native";

import ConnectedMain from "./Main";

export default function App() {
  //console.disableYellowBox = true
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <Provider store={store}>
      <ConnectedMain />
    </Provider>
  );
}
