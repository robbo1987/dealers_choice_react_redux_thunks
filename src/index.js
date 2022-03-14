import React from "react";
import { render } from "react-dom";
import axios from "axios";
import store, { loadGuitarists, loadGuitars } from "./store";
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
    };
  }
)(
  class App extends React.Component {
    componentDidMount() {
      this.props.bootstrap();
    }

    render() {
      const { guitarists } = this.props;
      return (
        <div id="body">
          <Nav />
          <h1>Robby's Guitar List</h1>
          <h2>Guitarists:</h2>
          <Guitarists />
          <h2>Guitars:</h2>
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
