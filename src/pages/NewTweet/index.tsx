import React, { useState } from "react";
import { View } from "react-native";
import { NavigationScreenComponent } from "react-navigation";

import CancelarButton from "../../components/CancelarButton";
import TweetarButton from "../../components/TweetarButton";
import { Buttons, TweetInput } from "./styles";

const NewTweet: NavigationScreenComponent = () => {
  const [tweet, setTweet] = useState("");
  return (
    <View>
      <Buttons>
        <CancelarButton />
        <TweetarButton disabled={!tweet.length} />
      </Buttons>
      <TweetInput
        value={tweet}
        onChangeText={t => setTweet(t)}
        placeholder="O que está acontecendo?"
        autoFocus
        multiline
      />
    </View>
  );
};

NewTweet.navigationOptions = {
  header: null
};

export default NewTweet;
