import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { clearNotification, setNotification } from "../utils";
import { Entypo } from "@expo/vector-icons";

export default class Result extends Component {
 componentDidMount = async () => {
  await clearNotification();
  await setNotification();
 };
 displayScore() {
  const { score, count } = this.props;
  const percentage = (score / count) * 100;
  let color = "green";
  let emoji = "emoji-happy";
  if (percentage < 50) {
   color = "red";
   emoji = "emoji-sad";
  } else if (percentage < 70) {
   color = "#CCCC00";
  }
  return {
   color,
   emoji,
   percentage,
  };
 }
 render() {
  const { score, count } = this.props;
  const { color, emoji, percentage } = this.displayScore();
  return (
   <View style={{ flex: 1, alignItems: "center", paddingTop: 60 }}>
    <Text style={styles.text}> Your Score : </Text>
    <Entypo name={emoji} size={50} color={color} />
    <Text style={[styles.text, { color: color }]}>{percentage} %</Text>
    <Text>
     You got {score} out of {count}
    </Text>
   </View>
  );
 }
}

const styles = StyleSheet.create({
 text: {
  fontSize: 30,
  marginBottom: 10,
  textAlign: "center",
  padding: 10,
  color: "#000",
 },
});
