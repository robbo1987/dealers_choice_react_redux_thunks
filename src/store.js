import { createStore } from "redux";
const LOAD_GUITARISTS = 'LOAD_GUITARISTS';
const LOAD_GUITARS = 'LOAD_GUITARS'

const store = createStore((state = { guitarists: [], guitars: [] }, action) => {
    if (action.type === LOAD_GUITARISTS) {
      state = {...state, guitarists: action.guitarists };
    }
    if(action.type === LOAD_GUITARS) {
      state = {...state, guitars: action.guitars}
    }
  
    return state;
  });

  const loadGuitarists = (guitarists) => {
        return {type: LOAD_GUITARISTS,
            guitarists,
        };
    }

  const loadGuitars = (guitars) => {
    return {
      type: LOAD_GUITARS,
      guitars
    }
  }

  export default store;
  export {loadGuitarists, loadGuitars};