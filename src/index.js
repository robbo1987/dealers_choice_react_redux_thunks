import React from "react";
import { render } from "react-dom";
import axios from "axios";
import store, { loadGuitarists, loadGuitars, setView } from "./store";
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
      },
      setView: function (view) {
        dispatch(setView(view));
      },
    };
  }
)(
  class App extends React.Component {
    componentDidMount() {
      this.props.bootstrap();
      window.addEventListener("hashchange", () => {
        this.props.setView(window.location.hash.slice(1));
      });
      this.props.setView(window.location.hash.slice(1));
    }

    render() {
      const view = this.props.view;
      return (
        <div id="body">
          <Nav />
          {view}
          <h1>Robby's Guitar List</h1>
          <h2> This First Section Tests the Nav Functionality</h2>
          {view === "guitarists" && <Guitarists />}
          {view === "guitars" && <Guitars />}
          <h2> This Second Section Shows All Seeded Data</h2>
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
