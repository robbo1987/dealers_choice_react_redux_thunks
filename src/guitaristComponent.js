import React from "react"
import { connect } from "react-redux";

const Guitarists = ( {guitarists}) => {
  return (
    <ul>
      {guitarists.map((guitarist) => {
        return <li key={guitarist.id}> {guitarist.name}</li>;
      })}
    </ul>
  );
};

export default connect(state=>state) (Guitarists)