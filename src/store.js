import { createStore, combineReducers, applyMiddleware } from "redux";
const LOAD_GUITARISTS = "LOAD_GUITARISTS";
const LOAD_GUITARS = "LOAD_GUITARS";
const CREATE_GUITARIST = "CREATE_GUITARIST";
import axios from "axios";
import thunk from "redux-thunk"


const guitaristsReducer = (state = [], action) => {
  if (action.type === LOAD_GUITARISTS) {
    state = action.guitarists;
  }
  if (action.type === CREATE_GUITARIST) {
    const guitarist = [...state, action.guitarist];

    return guitarist;
  }
  return state;
};

const guitarsReducer = (state = [], action) => {
  if (action.type === LOAD_GUITARS) {
    state = action.guitars;
  }
  return state;
};

const reducer = combineReducers({
  guitarists: guitaristsReducer,
  guitars: guitarsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

const loadGuitarists = (guitarists) => {
  return { type: LOAD_GUITARISTS, guitarists };
};


const loadGuitars = (guitars) => {
  return {
    type: LOAD_GUITARS,
    guitars,
  };
};

const createGuitarist = () => {
  return async (dispatch) => {
    const response = await axios.post('/api/guitarists')
    dispatch({ type: CREATE_GUITARIST, guitarist: response.data})
  }
}



export default store;
export { loadGuitarists, loadGuitars, createGuitarist };
