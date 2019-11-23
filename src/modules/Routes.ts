import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Me from "./Me";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import FeedNavigator from "./feed/FeedNavigator";

const App = createSwitchNavigator(
  {
    Me: { screen: Me },
    UserLogin: { screen: UserLogin },
    UserRegister: { screen: UserRegister },
    FeedNavigator: { screen: FeedNavigator }
  },
  { initialRouteName: "Me" }
);

const Routes = createAppContainer(App);

export default Routes;
