import {
  ACTION_TOKEN,
  ACTION_REDIRECT,
  ACTION_QUESTIONS,
  ACTION_URL,
  ACTION_SCORE,
  ACTION_SCORE_ZERO,
} from '../actions/index';

const INITIALSTATE = {
  token: '',
  isRedirect: false,
  questions: [],
  url: '',
  name: '',
  score: 0,
  email: '',
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
  case ACTION_URL:
    return {
      ...state,
      url: action.payload.url,
      name: action.payload.name,
      email: action.payload.email,
    };
  case ACTION_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case ACTION_SCORE_ZERO:
    return {
      ...state,
      isRedirect: false,
      score: 0,
    };
  default:
    return state;
  }
}

export default triviaGame;
