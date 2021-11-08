import { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  fetchWorkers,
  updateDepartment,
  updateSortOrder,
} from "../../redux/ducks/workers";
import { ERROR_TYPE, SORT_BY } from "../../constants";
import TopAppBar from "../TopAppBar";
import Workers from "../Workers";
import Error from "./../Error";

function HomeScreen() {
  const dispatch = useDispatch();

  // request data
  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  const { workers, isLoading, error, filters, hasVisibleData } = useSelector(
    (state) => state.workers,
    shallowEqual
  );

  const handleDepartmentChange = (depId) => {
    dispatch(updateDepartment(depId));
  };

  const handleSortByCange = (sortOrder) => {
    dispatch(updateSortOrder(sortOrder));
  };

  return (
    <>
      <TopAppBar
        isLoading={isLoading}
        selectedDepId={filters.selectedDepId}
        handleDepartmentChange={handleDepartmentChange}
        //
        checkedSortStrategy={filters.sortBy}
        handleSortByCange={handleSortByCange}
      />

      {/* {isLoading&&<Placeholder/>} */}

      {workers && hasVisibleData && (
        <Workers
          workers={workers}
          isBirthDateVisible={filters.sortBy === SORT_BY[1].value}
          // workers={workers}
        />
      )}

      {/* if no matching data exists */}
      {!hasVisibleData && <Error page={ERROR_TYPE.empty} />}

      {/* server error */}
      {error && <Error page={ERROR_TYPE.critical} />}
    </>
  );
}

export default HomeScreen;
