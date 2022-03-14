import React from "react";
import { connect } from "react-redux";

const Nav = ({ guitarists, guitars }) => {
  return (
    <nav>
      <a href="#guitarists">Guitarists - ({guitarists.length})</a>
      <a href="#guitars">Guitars - ({guitars.length})</a>
      <a href = '/all'> Entire List</a>
    </nav>
  );
};

export default connect((state) => state)(Nav);
