import { ACTION_TOKEN, ACTION_REDIRECT, ACTION_QUESTIONS } from '../actions/index';

const INITIALSTATE = {
  token: '',
  isRedirect: false,
  questions: [],
};

function triviaGame(state = INITIALSTATE, action) {
  switch (action.type) {
  case ACTION_REDIRECT:
    return {
      ...state,
      isRedirect: true,
    };
  case ACTION_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case ACTION_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
}

export default triviaGame;
