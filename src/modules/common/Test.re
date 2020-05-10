open ReactNative;

[@react.component]
let make = (~navigation, ~route) =>
  <View> <Text> "Test component"->React.string </Text> </View>;
