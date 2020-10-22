import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from "expo-notifications";
const UDACICARDS = "UDACICARDS";
const UDACINOTIFICATIONS = " UDACINOTIFICATIONS";
import * as Permissions from "expo-permissions";

// getDecks: return all of the decks along with their titles, questions, and answers.
export async function getDecks() {
 return JSON.parse(await AsyncStorage.getItem(UDACICARDS));
}
// getDeck: take in a single id argument and return the deck associated with that id.
export async function getDeck(id) {
 const decks = await getDecks();
 return decks[id];
}
// saveDeckTitle: take in a single title argument and add it to the decks.
export async function saveDeckTitle(title) {
 const newDeck = {
  [title]: {
   title,
   questions: [],
  },
 };
 try {
  const decks = await getDecks();
  decks === null
   ? AsyncStorage.setItem(UDACICARDS, JSON.stringify(newDeck))
   : AsyncStorage.mergeItem(UDACICARDS, JSON.stringify(newDeck));
  return newDeck;
 } catch (error) {
  console.log(error);
 }
}
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export async function addCardToDeck(title, card) {
 try {
  let decks = await getDecks();
  decks[title].questions.push(card);
  AsyncStorage.mergeItem(UDACICARDS, JSON.stringify(decks));
 } catch (error) {
  console.log(error);
 }
}
// remove Deck title from Deck
export async function removeDeckTitle(title) {
 try {
  let decks = await AsyncStorage.getItem(UDACICARDS);

  decks = JSON.parse(decks);
  delete decks[title];
  AsyncStorage.setItem(UDACICARDS, JSON.stringify(decks));
 } catch (error) {
  console.log(error);
 }
}

// clearing notification
export async function clearNotification() {
 const notification = await AsyncStorage.removeItem(UDACINOTIFICATIONS);
 Notifications.cancelAllScheduledNotificationsAsync(notification);
}

//setting notification for 8pm tomorrow
export async function setNotification() {
 let trigger = new Date();
 trigger.setDate(trigger.getDate() + 1);
 trigger.setHours(20);
 trigger.setMinutes(0);
 try {
  const data = JSON.parse(await AsyncStorage.getItem(UDACINOTIFICATIONS));
  if (data === null) {
   Notifications.cancelAllScheduledNotificationsAsync();
   const notification = await Permissions.askAsync(Permissions.NOTIFICATIONS);
   if (notification.status === "granted") {
    Notifications.setNotificationHandler({
     handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
     }),
    });
    Notifications.scheduleNotificationAsync({
     content: {
      title: "Mobile Flashcards!",
      body: "👋 don't forget to complete a quiz today!",
     },
     trigger,
    });
    AsyncStorage.setItem(UDACINOTIFICATIONS, JSON.stringify(true));
   }
  }
 } catch (error) {
  console.error(error);
 }
}
