import { createStore, combineReducers, applyMiddleware } from "redux";
const LOAD_GUITARISTS = "LOAD_GUITARISTS";
const LOAD_GUITARS = "LOAD_GUITARS";
const CREATE_GUITARIST = "CREATE_GUITARIST";
const DESTROY_GUITARIST = "DESTROY_GUITARIST";
import axios from "axios";
import thunk from "redux-thunk";

const guitaristsReducer = (state = [], action) => {
  if (action.type === LOAD_GUITARISTS) {
    state = action.guitarists;
  }
  if (action.type === CREATE_GUITARIST) {
    const guitarist = [...state, action.guitarist];

    return guitarist;
  }

  if (action.type === DESTROY_GUITARIST) {
    const guitarists = state.filter(
      (guitarist) => guitarist.id !== action.guitarist.id
    );
    state = guitarists;
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

const loadGuitarists = () => {
  
  return async (dispatch) => { 
    const guitarists = (await axios.get("/api/guitarists")).data;
    dispatch({type: LOAD_GUITARISTS, guitarists })
}
}

const loadGuitars = () => {
  
  return async (dispatch) => { 
    const guitars = (await axios.get("/api/guitars")).data;
    dispatch({type: LOAD_GUITARS, guitars })
}
}


const createGuitarist = () => {
  return async (dispatch) => {
    const response = await axios.post("/api/guitarists");
    dispatch({ type: CREATE_GUITARIST, guitarist: response.data });
  };
};

export default store;
export { loadGuitarists, loadGuitars, createGuitarist };
