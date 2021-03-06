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

  const handleSortChange = (sortOrder) => {
    dispatch(updateSortOrder(sortOrder));
  };

  const handleSearchCange = (searchKey) => {
    dispatch(updateSearchQuery(searchKey));
  };

  let content = null;

  if (isLoading) {
    content = <LoaderScreen />;
  } else if (error) {
    content = <Error />;
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
      (content = <Error type={ERROR_TYPE.EMPTY} />)
    );
  }
  return (
    <>
      <TopAppBar
        searchBarHandlers={{ handleSearchCange, handleSortChange }}
        departmentsTabsHandler={{ handleDepartmentChange }}
        appliedFilters={filters}
        isLoading={isLoading}
      />
      {content}
    </>
  );
}

export default HomeScreen;
