import { addCardToDeck, getDecks, saveDeckTitle } from "../utils";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const ADD_CARD = "ADD_CARD";

export function recieveDecks(decks) {
 return {
  type: RECEIVE_DECKS,
  decks,
 };
}
export function addDeck(deck) {
 return {
  type: ADD_DECK,
  deck,
 };
}

export function removeDeck(deck) {
 return {
  type: REMOVE_DECK,
  deck,
 };
}

export function addCard(deck, card) {
 return {
  type: ADD_CARD,
  deck,
  card,
 };
}

export function handleInitialData() {
 return (dispatch) => {
  return getDecks().then((decks) => {
   dispatch(recieveDecks(decks));
  });
 };
}

export function addCardToDeckData(DeckTitle, card) {
 return (dispatch) => {
  dispatch(addCard(DeckTitle, card));
  return addCardToDeck(DeckTitle, card);
 };
}

export function saveDeck(DeckTitle) {
 return (dispatch) => {
  return saveDeckTitle(DeckTitle).then((deck) => {
   dispatch(addDeck(deck));
  });
 };
}
