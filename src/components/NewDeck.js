import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import {
 Text,
 StyleSheet,
 KeyboardAvoidingView,
 SafeAreaView,
} from "react-native";
import { TextInput } from "react-native";
import { saveDeck } from "../actions/decks";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

class NewDeck extends Component {
 state = {
  text: "",
  error: false,
 };

 // saves the text state on change
 changeText = (text) => {
  this.setState({
   text,
  });
 };
 handleButton = () => {
  const { text } = this.state;
  const { decks } = this.props;
  //Error Statement when text is null
  if (text.trim("").length == 0) {
   this.setState({
    error: "Please Enter a Deck Title",
   });
  } else if (decks[text] !== undefined) {
   this.setState({
    error: "Oops, Deck Title Already Exists",
   });
  } else {
   const { navigation, saveDeck } = this.props;
   saveDeck(text);
   this.setState({
    text: "",
    error: "",
   });
   navigation.push("DeckView", {
    title: text,
   });
  }
 };
 componentDidMount() {
  const { navigation } = this.props;
  //adding listener to remove error once the page is reshown again
  this._unsubscribe = navigation.addListener("focus", () => {
   this.setState({
    error: false,
   });
  });
 }
 componentWillUnmount() {
  this._unsubscribe();
 }

 render() {
  const { error } = this.state;
  return (
   <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView style={{ width: "80%" }}>
     <Text style={styles.text}>What is the title of your new Deck?</Text>
     <TextInput
      style={[styles.input]}
      placeholder="Deck Title"
      onChangeText={this.changeText}
      defaultValue={this.state.text}
     />

     {error.length > 0 && (
      <Text style={[styles.error, { textAlign: "center", marginBottom: 20 }]}>
       {error}
      </Text>
     )}
     <TouchableOpacity onPress={this.handleButton} style={styles.button}>
      <Text style={{ color: "#fff" }}> Create Deck</Text>
     </TouchableOpacity>
    </KeyboardAvoidingView>
   </SafeAreaView>
  );
 }
}

function mapDispatchToProps(dispatch) {
 return {
  saveDeck: (deck) => dispatch(saveDeck(deck)),
 };
}
function mapStateToProps(state) {
 return {
  decks: state,
 };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);

const styles = StyleSheet.create({
 text: {
  fontSize: 30,
  textAlign: "center",
  color: "#000",

  marginTop: 40,
 },
 input: {
  height: 40,
  marginBottom: 60,

  borderBottomWidth: 1,
  marginTop: "20%",
 },
 button: {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
  paddingLeft: "30%",
  paddingRight: "30%",
  paddingTop: 10,
  paddingBottom: 10,
  marginBottom: 30,
 },
 error: {
  color: "red",
  fontSize: 15,
 },
 container: {
  // flex: 1,
  alignItems: "center",
  justifyContent: "space-between",
 },
});
