import { ADD_CARD, RECEIVE_DECKS, ADD_DECK } from "../actions/decks";

export default function decks(state = {}, action) {
 switch (action.type) {
  case RECEIVE_DECKS:
   return {
    ...action.decks,
   };
  case ADD_DECK:
   return {
    ...state,
    ...action.deck,
   };

  case ADD_CARD:
   return {
    ...state,
    [action.deck]: {
     ...state[action.deck],
     questions: state[action.deck].questions.concat([action.card]),
    },
   };
  default:
   return state;
 }
}
