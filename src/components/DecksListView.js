import React, { Component } from "react";
import {
 View,
 Text,
 StyleSheet,
 SafeAreaView,
 FlatList,
 TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/decks";
import { setNotification, scheduleAndCancel } from "../utils";

class DecksListView extends Component {
 _unsubscribe;
 //navigate to the DeckView on click
 handlePress = async (e, title) => {
  const { navigation } = this.props;
  navigation.push("DeckView", {
   title,
  });
 };
 //add a listener when the decks tab is clicked to repopulate the view
 // add a setnotification on mount
 componentDidMount = async () => {
  const { navigation, initialData } = this.props;
  this._unsubscribe = navigation.addListener("focus", async () => {
   initialData();
   await setNotification();
  });
 };
 //unsubscrible from the event when not mounted
 componentWillUnmount() {
  this._unsubscribe();
 }
 render() {
  const { decks } = this.props;
  return (
   <SafeAreaView style={styles.content}>
    {decks.length !== 0 ? (
     <FlatList
      data={decks}
      renderItem={({ item }) => (
       <View style={styles.container}>
        <TouchableOpacity
         onPress={(e) => this.handlePress(e, item.title)}
         style={{ alignItems: "center" }}>
         <Text style={styles.title}>{item.title}</Text>
         <Text style={styles.subTitle}>
          {item.questions.length}{" "}
          {item.questions.length !== 1 ? "cards" : "card"}
         </Text>
        </TouchableOpacity>
       </View>
      )}
      keyExtractor={(item, i) => i.toString()}
     />
    ) : (
     <View style={[styles.container, { paddingTop: 60 }]}>
      <Text style={styles.title}>There are no Deck Cards </Text>
     </View>
    )}
   </SafeAreaView>
  );
 }
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
 },
 title: {
  marginTop: 20,
  fontSize: 30,
  marginBottom: 5,
 },
 subTitle: {
  fontSize: 14,
  paddingBottom: 10,
 },
 content: {
  flex: 1,
 },
});

function mapDispatchToProps(dispatch) {
 return {
  initialData: () => dispatch(handleInitialData()),
 };
}

function mapStateToProps(state) {
 return {
  decks: Object.values(state) || [],
 };
}
export default connect(mapStateToProps, mapDispatchToProps)(DecksListView);
