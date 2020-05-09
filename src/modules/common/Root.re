open React;
open ReactNative;

[@react.component]
let make = () => <Suspense fallback=React.null> <App /> </Suspense>;
