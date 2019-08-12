import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import {
  createStackNavigator,
  NavigationScreenComponent
} from "react-navigation";
import SplashScreen from "react-native-splash-screen";

import { colors } from "../../styles";

const Feed: NavigationScreenComponent = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.white.string()}
      />
      <View />
    </>
  );
};

Feed.navigationOptions = {
  title: "Início"
};

const FeedNavigator = createStackNavigator(
  {
    Feed: { screen: Feed }
  },
  {
    initialRouteName: "Feed"
  }
);

export default FeedNavigator;
