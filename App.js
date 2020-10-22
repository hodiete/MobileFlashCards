import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DecksListView from "./src/components/DecksListView";
import NewDeck from "./src/components/NewDeck";
import NewCard from "./src/components/NewCard";
import DeckView from "./src/components/DeckView";
import Quiz from "./src/components/Quiz";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { createStore } from "redux";
import middleware from "./src/middleware";
import { Provider } from "react-redux";
import reducer from "./src/reducers/decks";
import { setNotification } from "./src/utils";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const store = createStore(reducer, middleware);

function HomeScreen() {
 return (
  <Tab.Navigator
   tabBarOptions={{
    activeTintColor: "#000",
    inactiveTintColor: "#d3d3d3",
    labelStyle: {
     fontSize: 12,
     fontWeight: "bold",
     marginBottom: 2,
    },
   }}>
   <Tab.Screen
    name="Decks"
    options={{
     tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="library-books" size={size} color={color} />
     ),
    }}
    component={DecksListView}
   />
   <Tab.Screen
    name="Add Deck"
    options={{
     tabBarIcon: ({ color, size }) => (
      <Entypo name="plus" size={size} color={color} />
     ),
    }}
    component={NewDeck}
   />
  </Tab.Navigator>
 );
}
// need to create a store to have a source of truth to keep track of the decks when it
// is created
export default function App() {
 return (
  <Provider store={store}>
   <NavigationContainer>
    <Stack.Navigator
     screenOptions={{
      headerStyle: {
       backgroundColor: "#d3d3d3",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
       fontWeight: "bold",
      },
     }}>
     <Stack.Screen
      name="Homepage"
      options={{ header: () => null, headerTitle: "" }}
      component={HomeScreen}
     />
     <Stack.Screen
      name="DeckView"
      component={DeckView}
      options={({ route }) => ({
       title: route.params.title,
      })}
     />
     <Stack.Screen
      name="NewCard"
      options={({ route }) => ({
       title: route.params.cardTitle,
      })}
      component={NewCard}
     />
     <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={({ route }) => ({
       title: route.params.cardTitle,
      })}
     />
    </Stack.Navigator>
   </NavigationContainer>
  </Provider>
 );
}
