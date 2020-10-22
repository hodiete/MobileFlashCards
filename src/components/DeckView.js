import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { removeDeckTitle } from "../utils";

class DeckView extends Component {
 state = {
  deckQuestionCount: 0,
 };

 handleAddCardButton = () => {
  const { navigation, route } = this.props;

  navigation.navigate("NewCard", {
   deckTitle: route.params.title,
   cardTitle: "Add new Card",
  });
 };
 // delete and navigate to the homescreen that shows list of decks
 handleDelete = async () => {
  const { navigation, route } = this.props;
  await removeDeckTitle(route.params.title);

  navigation.goBack();
 };

 //when the start Quiz button is pressed, we want to navigate to the quiz screen
 handleStartQuizButton = async () => {
  const { navigation, route, questionCount } = this.props;
  //clearing notification once quiz has been started
  //provide card title if there is a quiz, if not then provide null
  navigation.navigate("Quiz", {
   deckTitle: route.params.title,
   cardTitle: questionCount > 0 ? "Quiz" : null,
  });
 };

 render() {
  const { route, questionCount } = this.props;
  return (
   <View style={styles.container}>
    <View style={styles.deckItems}>
     <Text style={styles.header}> {route.params.title}</Text>
     <Text>
      {questionCount} {questionCount !== 1 ? "cards" : "card"}
     </Text>
    </View>
    <View style={styles.container}>
     <TouchableOpacity
      onPress={this.handleAddCardButton}
      style={[styles.button, styles.card]}>
      <Text> Add Card </Text>
     </TouchableOpacity>
     <TouchableOpacity
      onPress={this.handleStartQuizButton}
      style={[styles.button, styles.quiz]}>
      <Text style={styles.text}> Start Quiz</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={this.handleDelete}>
      <Text style={styles.delete}> Delete Deck</Text>
     </TouchableOpacity>
    </View>
   </View>
  );
 }
}

function mapStateToProps(state, { route }) {
 return {
  questionCount:
   state[route.params.title] != undefined
    ? state[route.params.title].questions.length
    : 0,
  decks: state,
 };
}

export default connect(mapStateToProps)(DeckView);

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
 },

 button: {
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  paddingLeft: "30%",
  paddingRight: "30%",
  paddingTop: 10,
  paddingBottom: 10,
  marginBottom: 30,
 },
 quiz: {
  backgroundColor: "#000",
 },
 card: {
  backgroundColor: "#fff",
 },
 deckItems: {
  alignItems: "center",
  marginBottom: 30,
  marginTop: 30,
 },
 header: {
  fontSize: 40,
  marginBottom: 10,
 },
 delete: {
  color: "red",
 },
 text: {
  color: "#fff",
 },
});
