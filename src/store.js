import { createStore, combineReducers } from "redux";
const LOAD_GUITARISTS = "LOAD_GUITARISTS";
const LOAD_GUITARS = "LOAD_GUITARS";
const SET_VIEW = 'SET_VIEW'



const guitaristReducer = (state = [], action) => {
  if (action.type === LOAD_GUITARISTS) {
    state = action.guitarists
  }
  return state

}

const guitarReducer = (state = [], action) => {
  if (action.type === LOAD_GUITARS) {
    state = action.guitars ;
  }
  return state
}
const setViewReducer = (state = 'guitarists', action) => {
  if (action.type === SET_VIEW) {
    state = action.view
  }
    return state
}

const reducer = combineReducers({
  guitarists: guitaristReducer,
  guitars: guitarReducer,
  views: setViewReducer
})

const store = createStore(reducer)


const loadGuitarists = (guitarists) => {
  return { type: LOAD_GUITARISTS, guitarists };
};

const loadGuitars = (guitars) => {
  return {
    type: LOAD_GUITARS,
    guitars,
  };
};

const setView = (view) => {
  return {
    type: SET_VIEW,
    view
  }
}

export default store;
export { loadGuitarists, loadGuitars, setView };
