import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWorkersList } from "../../redux/ducks/workers";

import SearchBar from "../SearchBar";
import Departments from "../Departments";

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkersList());
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <Departments />
    </>
  );
}

export default HomeScreen;
