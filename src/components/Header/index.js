import React from "react";
import SearchBar from "../SearchBar";
import Departments from "../Departments";

function Header() {
  return (
    <React.Fragment>
      <SearchBar />
      <Departments />
    </React.Fragment>
  );
}

export default Header;
