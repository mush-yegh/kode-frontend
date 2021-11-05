import { useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { fetchWorkersList } from "../../redux/ducks/workers";
import { DEPARTMENTS, ERROR_TYPE } from "../../constants";
import TopAppBar from "../TopAppBar";
import Workers from "../Workers";
import Error from "./../Error";
import { compareByFullName, compareByClosestBirthday } from "../../util";
import { SORT_BY } from "./../../constants";

const initialHomeState = {
  workersList: null,
  searchTherm: "",
  sortBy: SORT_BY[0].value,
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

  // update local state when data successfully retrieved
  useEffect(() => {
    workersList &&
      setHomeState((prevState) => {
        return {
          ...prevState,
          workersList,
        };
      });
  }, [workersList]);

  // update each worker's 'isInSelectedDep' property depending on selected department
  const handleDepartmentChange = (department) => {
    const isAllSelected = department === initialHomeState.selectedDepartment;
    const updatedList = homeState.workersList.map((worker) => ({
      ...worker,
      isInSelectedDep: isAllSelected || worker.department === department,
    }));
    setHomeState({
      ...homeState,
      workersList: updatedList,
      selectedDepartment: department,
    });
  };

  const handleSortByCange = (value) => {
    const comparer =
      value === SORT_BY[0].value ? compareByFullName : compareByClosestBirthday;
    const updatedList = homeState.workersList.sort(comparer);
    setHomeState({
      ...homeState,
      sortBy: value,
      workersList: updatedList,
    });
  };

  return (
    <>
      <TopAppBar
        selectedDepartment={homeState.selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
        checkedSortStrategy={homeState.sortBy}
        handleSortByCange={handleSortByCange}
      />
      {/* {isLoading&&<Placeholder/>} */}
      {/* if result is empty on tab change */}
      {homeState.workersList && (
        <Workers
          workers={homeState.workersList}
          isBirthDateVisible={homeState.sortBy === SORT_BY[1].value}
        />
      )}
      {error && <Error page={ERROR_TYPE.critical} />}
    </>
  );
}

export default HomeScreen;
