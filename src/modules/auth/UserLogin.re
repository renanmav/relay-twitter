open ReactNative;
open ReactNavigation;
open UserLoginWithEmailMutation_graphql.Types;

module StackParams = {
  type params =
    | None;
};
include Stack.Make(StackParams);

module UserEmailWithEmailMutation = [%relay.mutation
  {|
    mutation UserLoginWithEmailMutation($input: UserLoginWithEmailInput!) {
      userLoginWithEmail: UserLoginWithEmail(input: $input) {
        token
        error
      }
    }
  |}
];

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
  let (loading, setLoading) = React.useState(() => false);

  let secondInputRef = React.useRef(Js.Nullable.null);

  let (mutate, _) = UserEmailWithEmailMutation.use();

  let handleLogin = _ =>
    if (!loading) {
      setLoading(_ => true);

      mutate(
        ~variables={
          input: {
            clientMutationId: None,
            email,
            password,
          },
        },
        ~onCompleted=
          (data, _) => {
            setLoading(_ => false);

            (
              switch (data) {
              | {userLoginWithEmail: None} => ()
              | {userLoginWithEmail: Some({error: Some(error)})} =>
                Alert.alert(~title="Erro no login", ~message=error, ())
              | {userLoginWithEmail: Some(userLoginWithEmail)} =>
                switch (userLoginWithEmail.token) {
                | Some(token) =>
                  ReactNativeAsyncStorage.setItem("token", token) |> ignore;
                  navigation->Navigation.navigate("FeedNavigator");
                | None =>
                  Alert.alert(
                    ~title="Erro no login",
                    ~message="Estamos com problemas no nosso servidor",
                    (),
                  )
                }
              }
            )
            |> ignore;
          },
        (),
      )
      |> ignore;
    };

  let handleRegister = _ => {
    navigation->Navigation.navigate("UserRegister");
  };

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
            | Some(ref) => ref->elementToObj##focus()
            | None => ()
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
          onSubmitEditing=handleLogin
          style=styles##input
        />
        <TouchableOpacity
          style={StyleSheet.flatten([|styles##button, styles##colorful|])}
          onPress=handleLogin>
          {loading
             ? <ActivityIndicator
                 size={ActivityIndicator_Size.exact(18.0)}
                 color="#fff"
               />
             : <Text
                 style={StyleSheet.flatten([|
                   styles##buttonText,
                   styles##colorful,
                 |])}>
                 "Entrar"->React.string
               </Text>}
        </TouchableOpacity>
        <TouchableOpacity style=styles##button onPress=handleRegister>
          <Text style=styles##buttonText> "Registrar"->React.string </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </>;
};
