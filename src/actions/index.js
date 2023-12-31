export const ACTION_TOKEN = 'ACTION_TOKEN';
export const ACTION_REDIRECT = 'ACTION_REDIRECT';
export const ACTION_QUESTIONS = 'ACTION_QUESTIONS';
export const ACTION_URL = 'ACTION_URL';
export const ACTION_SCORE = 'ACTION_SCORE';
export const ACTION_SCORE_ZERO = 'ACTION_SCORE_ZERO';

const actionRedirect = () => ({
  type: ACTION_REDIRECT,
});

const actionToken = (token) => ({
  type: ACTION_TOKEN,
  token,
});

const actionQuestions = (questions) => ({
  type: ACTION_QUESTIONS,
  questions,
});

function fetchQuestionsAndAnswers(token) {
  return (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((questions) => dispatch(actionQuestions(questions.results))); // results is the key of the object response received from API with the questions and answers
}

const storageInicial = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  ranking: [],
  token: '',
};

const updateStorage = (token = '') => {
  const Storage = JSON.parse(localStorage.getItem('state'));
  const state = !Storage ? storageInicial : Storage;
  state.token = token;
  localStorage.setItem('state', JSON.stringify(state));
};

const saveLocalState = (token) => {
  updateStorage(token);
  localStorage.setItem('token', JSON.stringify(token));
};

export function fetchToken() {
  return (dispatch) => {
    dispatch(actionRedirect());
    updateStorage();
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => {
        dispatch(actionToken(response.token));
        dispatch(fetchQuestionsAndAnswers(response.token));
        saveLocalState(response.token);
      });
  };
}
