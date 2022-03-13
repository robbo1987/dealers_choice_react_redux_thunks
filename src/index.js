import React from "react";
import { render } from "react-dom";
import axios from "axios";
import store from "./store";
import { Provider, connect } from "react-redux";

const App = connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      bootstrap: async () => {
        const guitarists = (await axios.get("/api/guitarists")).data;
        //const guitarsResponse = await axios.get("/api/guitars").data;
        dispatch({
          type: "LOAD_GUITARISTS",
          guitarists,
        });
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
          {guitarists.length}
          <h1>Robby's Guitar List</h1>
          <h2>Guitarists:</h2>
          <ul>
            {guitarists.map((guitarist) => {
              return <li> {guitarist.name}</li>;
            })}
          </ul>
          <h2>Guitars:</h2>
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
