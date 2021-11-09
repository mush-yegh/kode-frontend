import React from "react";
import { useDispatch } from "react-redux";
import { fetchWorkers } from "../redux/ducks/workers";

const SiteWrapper = ({ children }) => {
  const dispatch = useDispatch();

  dispatch(fetchWorkers());

  return <React.Fragment>{children}</React.Fragment>;
};

export default SiteWrapper;
