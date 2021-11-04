import { useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { fetchWorkersList } from "../../redux/ducks/workers";
import { DEPARTMENTS, ERROR_TYPE } from "../../constants";
import TopAppBar from "../TopAppBar";
import Workers from "../Workers";
import Error from "./../Error";

const initialHomeState = {
  workersList: null,
  searchTherm: "",
  orderBy: "name", //TO Do -move to constants
  selectedDepartment: DEPARTMENTS[0].name,
};

function HomeScreen() {
  const dispatch = useDispatch();

  const { workersList, isLoading, error } = useSelector(
    (state) => state.workers,
    shallowEqual
  );

  // request data
  useEffect(() => {
    dispatch(fetchWorkersList());
  }, [dispatch]);

  const [homeState, setHomeState] = useState(initialHomeState);

  //update local state when request fulfilled
  useEffect(() => {
    //TO DO - should sort depending on "orderBy"
    setHomeState((prevState) => {
      return { ...prevState, workersList };
    });
  }, [workersList]);

  // if 'All' is chosen(DEPARTMENTS[0]) no filtering is required,
  // otherwise filter by department name and then set local state
  const handleDepartmentChange = (department) => {
    const updatedList =
      department === DEPARTMENTS[0].name
        ? workersList
        : workersList.filter((worker) => worker.department === department);

    setHomeState({
      ...homeState,
      workersList: updatedList,
      selectedDepartment: department,
    });
  };

  return (
    <>
      <TopAppBar
        selectedDepartment={homeState.selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
      />
      {/* {isLoading&&<Placeholder/>} */}
      {/* if result is empty on tab change */}
      {homeState.workersList && <Workers workers={homeState.workersList} />}
      {error && <Error page={ERROR_TYPE.critical} />}
    </>
  );
}

export default HomeScreen;
