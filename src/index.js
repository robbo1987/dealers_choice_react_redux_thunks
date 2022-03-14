import React from "react";
import { render } from "react-dom";
import axios from "axios";
import store, { loadGuitarists, loadGuitars} from "./store";
import { Provider, connect } from "react-redux";
import Nav from "./Nav.js";
import Guitarists from "./guitaristComponent";
import Guitars from "./guitarsComponent";

const App = connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      bootstrap: async () => {
        const guitarists = (await axios.get("/api/guitarists")).data;
        const guitars = (await axios.get("/api/guitars")).data;
        dispatch(loadGuitarists(guitarists));
        dispatch(loadGuitars(guitars));
      }
    };
  }
)(
  class App extends React.Component {
    componentDidMount() {
      this.props.bootstrap();
      
    }

    render() {
      const view = this.props.view;
      return (
        <div id="body">
          <Nav />
          {view}
          <h1>Robby's Guitar List</h1>
          
          <h2> This Section Shows All Seeded Data</h2>
          <Guitarists />
          <Guitars />
        </div>
      );
    }
  }
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

//NEED TO ADD COMBINE REDUCERS, THUNKS AND POST/DELETE