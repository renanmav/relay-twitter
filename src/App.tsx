import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Me from "./pages/Me";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import FeedNavigator from "./pages/Feed";

const App = createSwitchNavigator(
  {
    Main: { screen: Me },
    UserLogin: { screen: UserLogin },
    UserRegister: { screen: UserRegister },
    FeedNavigator: { screen: FeedNavigator }
  },
  { initialRouteName: "Main" }
);

const RelayApp = createAppContainer(App);

export default RelayApp;
