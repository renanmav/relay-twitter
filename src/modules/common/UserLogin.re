open ReactNative;

let logo =
  Image.Source.fromRequired(Packager.require("../../assets/img/logo.png"));

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
      "logo":
        viewStyle(
          ~width=64.0->dp,
          ~height=64.0->dp,
          ~marginBottom=30.0->dp,
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
      "button":
        viewStyle(
          ~borderWidth=1.0,
          ~borderColor="#1EA1F3",
          ~borderRadius=20.0,
          ~paddingHorizontal=20.0->dp,
          ~paddingVertical=10.0->dp,
          ~width=100.0->pct,
          ~alignItems=`center,
          ~justifyContent=`center,
          ~marginTop=20.0->dp,
          ~height=42.0->dp,
          (),
        ),
      "buttonText": textStyle(~fontWeight=`bold, ~color="#1EA1F3", ()),
      "colorful": style(~backgroundColor="#1EA1F3", ~color="#fff", ()),
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
        <Image source=logo resizeMode=`contain style=styles##logo />
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
        <TouchableOpacity
          style={StyleSheet.flatten([|styles##button, styles##colorful|])}>
          <Text
            style={StyleSheet.flatten([|
              styles##buttonText,
              styles##colorful,
            |])}>
            "Entrar"->React.string
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style=styles##button>
          <Text style=styles##buttonText> "Registrar"->React.string </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </>;
};
