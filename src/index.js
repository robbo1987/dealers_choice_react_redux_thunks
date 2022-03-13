import React from "react";
import { render } from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      guitarists: [],
      guitars: [],
    };
  }
  async componentDidMount() {
    const guitaristResponse = await axios.get("/api/guitarists");
    this.setState({
      guitarists: guitaristResponse.data,
    });
  }

  render() {
    const guitarists = this.state.guitarists;
    return (
      <div id="body">
        <h1>Robby's Guitar List</h1>
        <h2>Guitarists:</h2>
        <ul>
          {guitarists.map((guitarist) => {
            return <li> {guitarist.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

render(<App />, document.querySelector("#root"));
