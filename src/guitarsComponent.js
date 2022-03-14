import React from "react"
import { connect } from "react-redux";

const Guitars = ( {guitars}) => {
  return (
    <ul>
      {guitars.map((guitar) => {
        return <li key={guitar.id}> {guitar.name}</li>;
      })}
    </ul>
  );
};

export default connect(state=>state) (Guitars)