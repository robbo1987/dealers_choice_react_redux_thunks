import { createStore } from "redux";

const store = createStore((state = { guitarists: [] }, action) => {
    if (action.type === 'LOAD_GUITARISTS') {
      state = {...state, guitarists: action.guitarists };
    }
  
    return state;
  });

  export default store