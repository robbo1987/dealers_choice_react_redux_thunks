import React from "react";
import { connect } from "react-redux";
import { createGuitarist } from "./store";

const Create = ({ create }) => {
  return <button onClick={create}>Create Guitarist</button>;
};

const mapDispatch = (dispatch) => {
  return {
    create: () => {
      dispatch(createGuitarist());
    },
  };
};

export default connect(null, mapDispatch)(Create);
