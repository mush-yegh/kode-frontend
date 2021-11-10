import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  updateDepartment,
  updateSortOrder,
  updateSearchQuery,
} from "../../redux/ducks/workers";
import { ERROR_TYPE, SORT_BY } from "../../constants";
import TopAppBar from "../TopAppBar";
import LoaderScreen from "../LoaderScreen";
import Workers from "../Workers";
import Error from "./../Error";

function HomeScreen() {
  const dispatch = useDispatch();

  const { workers, isLoading, error, filters } = useSelector(
    (state) => state.workers,
    shallowEqual
  );

  const handleDepartmentChange = (depId) => {
    dispatch(updateDepartment(depId));
  };

  const handleSortByCange = (sortOrder) => {
    dispatch(updateSortOrder(sortOrder));
  };

  const handleSearchCange = (searchKey) => {
    dispatch(updateSearchQuery(searchKey));
  };

  let content = null;

  if (isLoading) {
    content = <LoaderScreen />;
  } else if (error) {
    content = <Error page={ERROR_TYPE.CRITICAL} />;
  } else {
    const visibleWorkers = workers.filter(
      (worker) => worker.isInSelectedDep && worker.isInSearch
    );

    content = visibleWorkers.length ? (
      <Workers
        workers={visibleWorkers}
        isBirthDayVisible={filters.sortBy === SORT_BY[1].value}
        isLoading={isLoading}
      />
    ) : (
      (content = <Error page={ERROR_TYPE.EMPTY} />)
    );
  }

  return (
    <>
      <TopAppBar
        isLoading={isLoading}
        selectedDepId={filters.selectedDepId}
        handleDepartmentChange={handleDepartmentChange}
        //
        checkedSortStrategy={filters.sortBy}
        handleSortByCange={handleSortByCange}
        //
        searchKey={filters.searchKey}
        handleSearchCange={handleSearchCange}
      />
      {content}
    </>
  );
}

export default HomeScreen;
