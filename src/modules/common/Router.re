open ReactNavigation;

include Stack.Make({
  type params = unit;
});

[@react.component]
let make = () =>
  <Native.NavigationContainer>
    <Navigator initialRouteName="Test">
      <Screen name="Test" component=Test.make />
    </Navigator>
  </Native.NavigationContainer>;
