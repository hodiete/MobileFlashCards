import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { connect } from "react-redux";
import { addCardToDeckData } from "../actions/decks";

class NewCard extends Component {
 state = {
  question: "",
  answer: "",
  error: "",
 };
 handleButton = () => {
  const { question, answer } = this.state;
  const { navigation, route, addCard } = this.props;
  const card = {
   question,
   answer,
  };
  if (question.trim("").length == 0 || answer.trim("").length == 0) {
   this.setState({
    error: "Please Enter a Valid Question and Answer",
   });
  } else {
   //adding card to deck title and navigating to the deckview
   addCard(route.params.deckTitle, card);
   navigation.navigate("DeckView");
   this.setState({
    error: "",
   });
  }
 };
 changeQuestionText = (question) => {
  this.setState({
   question,
  });
 };
 changeAnswerText = (answer) => {
  this.setState({
   answer,
  });
 };
 render() {
  const { error } = this.state;
  return (
   <View style={styles.container}>
    <TextInput
     placeholder="Question"
     onChangeText={this.changeQuestionText}
     defaultValue={this.state.question}
     style={[styles.button, styles.input, { marginTop: 60 }]}
    />
    <TextInput
     placeholder="Answer"
     onChangeText={this.changeAnswerText}
     defaultValue={this.state.answer}
     style={[styles.button, styles.input]}
    />

    <View>
     {error.length > 0 && <Text style={styles.error}>{error} </Text>}
     <TouchableOpacity onPress={this.handleButton} style={styles.button}>
      <Text style={styles.text}> Submit </Text>
     </TouchableOpacity>
    </View>
   </View>
  );
 }
}
function mapDispatchToProps(dispatch) {
 return {
  addCard: (title, card) => dispatch(addCardToDeckData(title, card)),
 };
}

export default connect(null, mapDispatchToProps)(NewCard);

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
 },
 input: {
  borderWidth: 1,
  height: 40,
  backgroundColor: "transparent",
  paddingLeft: 5,
  paddingRight: 0,
  width: "80%",
 },
 button: {
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "32%",
  paddingRight: "32%",
  paddingTop: 10,
  paddingBottom: 10,
  marginBottom: 30,
  borderWidth: 1,

  backgroundColor: "#000",
 },
 text: {
  color: "#fff",
 },
 error: {
  color: "red",
  marginBottom: 10,
 },
});
