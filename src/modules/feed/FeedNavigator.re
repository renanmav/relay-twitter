// open ReactNative;
open ReactNavigation;

include Stack.Make({
  type params = unit;
});

[@react.component]
let make = (~navigation as _, ~route as _) => {
  <Navigator> <Screen name="Feed" component=Feed.make /> </Navigator>;
};
