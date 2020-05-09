[@react.component]
let make = () =>
  <ReasonRelay.Context.Provider environment=Environment.environment>
    <React.Suspense fallback=React.null> <App /> </React.Suspense>
  </ReasonRelay.Context.Provider>;
