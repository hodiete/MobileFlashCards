import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Result from "./Result";
class Quiz extends React.Component {
 state = {
  quizCount: 0,
  score: 0,
  showAnswer: false,
 };

 // reset quiz count
 reset() {
  this.setState({
   quizCount: 0,
   score: 0,
   showAnswer: false,
  });
 }

 // update the scores
 updateQuizCount(count, questions) {
  return (
   <Text style={{ fontSize: 16, marginBottom: 10 }}>
    {count + 1}/{questions.length}
   </Text>
  );
 }
 // show the quiz question
 showQuizQuestion(count, question) {
  return (
   <View style={{ alignItems: "center" }}>
    <Text style={{ marginBottom: 20, fontSize: 30, textAlign: "center" }}>
     {question[count].question}
    </Text>
    <Text
     style={{ fontWeight: "bold", textTransform: "uppercase", color: "red" }}>
     Question
    </Text>
   </View>
  );
 }
 //toggle to show
 toggle() {
  this.setState({
   showAnswer: !this.state.showAnswer,
  });
 }
 // show the quiz question
 showQuizAnswer(count, question) {
  return (
   <View style={{ alignItems: "center" }}>
    <Text style={{ marginBottom: 20, fontSize: 30, textAlign: "center" }}>
     {question[count].answer}
    </Text>
    <Text
     style={{ fontWeight: "bold", textTransform: "uppercase", color: "blue" }}>
     Answer
    </Text>
   </View>
  );
 }
 // if button is correct, upate the score
 handleButton(e, button) {
  e.preventDefault();

  if (button === "correct") {
   this.setState({
    quizCount: this.state.quizCount + 1,
    score: this.state.score + 1,
    showAnswer: false,
   });
  } else {
   this.setState({
    quizCount: this.state.quizCount + 1,
    showAnswer: false,
   });
  }
 }

 render() {
  const { navigation, route, questions } = this.props;
  const { quizCount, score, showAnswer } = this.state;

  // if there is no card title, we want to display noquiz
  if (route.params.cardTitle == null) {
   return <NoQuiz />;
  }
  // if the count is up, we want to display a results page with reset and go back to deck as buttons
  if (quizCount === questions.length) {
   return (
    <View style={{ flex: 1 }}>
     <Result score={score} count={quizCount} />
     <View
      style={{
       flex: 1,
       flexDirection: "row",
       alignItems: "flex-start",
       justifyContent: "space-around",
      }}>
      <TouchableOpacity
       onPress={() => this.reset()}
       style={{ backgroundColor: "#000", padding: 10 }}>
       <Text style={{ color: "#fff" }}>Restart Quiz </Text>
      </TouchableOpacity>
      <TouchableOpacity
       onPress={() => navigation.goBack()}
       style={{ borderWidth: 1, padding: 10 }}>
       <Text> Back To Deck</Text>
      </TouchableOpacity>
     </View>
    </View>
   );
  }
  return (
   <View style={styles.container}>
    <View style={{ paddingLeft: 20 }}>
     {this.updateQuizCount(quizCount, questions)}
    </View>
    <View style={{ alignItems: "center" }}>
     {!showAnswer
      ? this.showQuizQuestion(quizCount, questions)
      : this.showQuizAnswer(quizCount, questions)}
    </View>
    <View style={styles.secondContainer}>
     <TouchableOpacity
      style={[styles.button, styles.buttonCorrect]}
      onPress={(e) => this.handleButton(e, "correct")}>
      <Text style={styles.quizText}> Correct </Text>
     </TouchableOpacity>
     <TouchableOpacity
      style={[styles.button, styles.buttonIncorrect]}
      onPress={(e) => this.handleButton(e, "incorrect")}>
      <Text style={styles.quizText}> Incorrect </Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => this.toggle()}>
      {!showAnswer ? (
       <Text style={styles.answer}> Show Answer </Text>
      ) : (
       <Text style={[styles.answer, { color: "red" }]}> Show Question </Text>
      )}
     </TouchableOpacity>
    </View>
   </View>
  );
 }
}
function NoQuiz() {
 return (
  <View style={styles.container}>
   <Text style={styles.text}>
    Sorry, You Cannot Take a Quiz because there are no cards in the deck
   </Text>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  paddingTop: 10,
 },
 secondContainer: {
  marginTop: "50%",
  alignItems: "center",
 },
 text: {
  fontSize: 30,
  marginBottom: 10,
  textAlign: "center",
  padding: 10,
  color: "#000",
 },

 button: {
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 5,
  paddingLeft: "30%",
  paddingRight: "30%",
  paddingTop: 10,
  paddingBottom: 10,
  marginBottom: 30,
 },
 buttonCorrect: {
  backgroundColor: "green",
 },
 buttonIncorrect: {
  backgroundColor: "red",
 },
 quizText: {
  color: "#fff",
  fontWeight: "bold",
 },
 answer: {
  color: "blue",
 },
 card: {
  justifyContent: "center",
  alignItems: "center",
 },
});
// get question and answers  for a particular title
function mapStateToProps(state, { route }) {
 return {
  questions: state[route.params.deckTitle].questions,
 };
}

export default connect(mapStateToProps)(Quiz);
