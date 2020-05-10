open ReactNative;

let styles =
  Style.(
    StyleSheet.create({
      "content":
        viewStyle(
          ~flex=1.0,
          ~justifyContent=`center,
          ~alignItems=`center,
          ~marginHorizontal=40.0->dp,
          (),
        ),
      "input":
        textStyle(
          ~borderBottomWidth=StyleSheet.hairlineWidth,
          ~borderBottomColor="#ddd",
          ~width=100.0->pct,
          ~padding=0.0->dp,
          ~marginTop=24.0->dp,
          ~paddingBottom=5.0->dp,
          ~color="#222",
          (),
        ),
    })
  );

external elementToObj: TextInput.element => Js.t({..}) = "%identity";

[@react.component]
let make = (~navigation, ~route) => {
  let (email, setEmail) = React.useState(() => "");
  let (password, setPassword) = React.useState(() => "");

  let secondInputRef = React.useRef(Js.Nullable.null);

  <>
    <StatusBar barStyle=`darkContent backgroundColor="#fff" />
    <TouchableWithoutFeedback onPress={_ => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior=`padding style=styles##content>
        <TextInput
          autoCorrect=false
          placeholderTextColor="#999"
          keyboardType=`emailAddress
          placeholder="E-mail"
          returnKeyType=`next
          autoCapitalize=`none
          value=email
          onChangeText={e => setEmail(_ => e)}
          onSubmitEditing={_ =>
            switch (Js.Nullable.toOption(React.Ref.current(secondInputRef))) {
            | None => ()
            | Some(ref) => ref->elementToObj##focus()
            }
          }
          style=styles##input
        />
        <TextInput
          ref=secondInputRef
          secureTextEntry=true
          placeholderTextColor="#999"
          placeholder="Senha"
          returnKeyType=`send
          value=password
          onChangeText={p => setPassword(_ => p)}
          autoCapitalize=`none
          style=styles##input
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </>;
};
