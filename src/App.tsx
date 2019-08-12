import React, { useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import {
  createSwitchNavigator,
  createAppContainer,
  NavigationScreenProp
} from "react-navigation";

import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import FeedNavigator from "./pages/Feed";

import { TT_TOKEN } from "./constants";
import { View } from "react-native";

interface MainProps {
  navigation: NavigationScreenProp<{}>;
}

const Main = ({ navigation }: MainProps) => {
  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem(TT_TOKEN);

      if (token) return navigation.navigate("FeedNavigator");

      navigation.navigate("UserLogin");
    };

    verifyToken();
  }, [navigation]);

  return <View />;
};

const App = createSwitchNavigator(
  {
    Main: { screen: Main },
    UserLogin: { screen: UserLogin },
    UserRegister: { screen: UserRegister },
    FeedNavigator: { screen: FeedNavigator }
  },
  { initialRouteName: "Main" }
);

const RelayApp = createAppContainer(App);

export default RelayApp;
