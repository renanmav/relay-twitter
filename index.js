import { AppRegistry } from "react-native";
import Root from "./src/modules/common/Root";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => Root);
