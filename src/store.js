import { createStore, combineReducers } from "redux";
const LOAD_GUITARISTS = "LOAD_GUITARISTS";
const LOAD_GUITARS = "LOAD_GUITARS";
const CREATE_GUITARIST = "CREATE_GUITARIST";

const guitaristsReducer = (state = [], action) => {
  if (action.type === LOAD_GUITARISTS) {
    state = action.guitarists;
  }
  if (action.type === CREATE_GUITARIST) {
    console.log("ACTION", action.guitarist);
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

const loadGuitarists = (guitarists) => {
  return { type: LOAD_GUITARISTS, guitarists };
};

const loadGuitars = (guitars) => {
  return {
    type: LOAD_GUITARS,
    guitars,
  };
};

const store = createStore(reducer);

export default store;
export { loadGuitarists, loadGuitars };
