import React from "react";
import { render } from "react-dom";
import axios from "axios";
import store, { loadGuitarists, loadGuitars } from "./store";
import { Provider, connect } from "react-redux";
import Create from "./Create.js";
import Guitarists from "./guitaristComponent";
import Guitars from "./guitarsComponent";

const App = connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      bootstrap: async () => {
        dispatch(loadGuitarists())
        dispatch(loadGuitars());
      },
    };
  }
)(
  class App extends React.Component {
    componentDidMount() {
      this.props.bootstrap();
    }

    render() {
      return (
        <div id="body">
          <h1>Robby's Guitar List</h1>

          <h2> This Section Shows All Seeded Data</h2>
          <h2> Guitarists! </h2>
          <Create />
          <Guitarists />
          <h2> Guitars! </h2>
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
