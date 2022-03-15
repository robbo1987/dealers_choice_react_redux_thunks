import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import store from "./store";

const destroy = async (guitarist) => {
  await axios.delete(`/api/guitarists/${guitarist.id}`);
  store.dispatch({ type: "DESTROY_GUITARIST", guitarist });
};

const Guitarists = ({ guitarists }) => {
  return (
    <ul>
      {guitarists.map((guitarist) => {
        return (
          <li key={guitarist.id}>
            {guitarist.name} -
            <button onClick={() => destroy(guitarist)}> DELETE </button>
          </li>
        );
      })}
    </ul>
  );
};

export default connect((state) => state)(Guitarists);
