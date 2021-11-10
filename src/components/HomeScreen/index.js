import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  updateDepartment,
  updateSortOrder,
  updateSearchQuery,
} from "../../redux/ducks/workers";
import { ERROR_TYPE, SORT_BY } from "../../constants";
import TopAppBar from "../TopAppBar";
import Workers from "../Workers";
import Error from "./../Error";

function HomeScreen() {
  const dispatch = useDispatch();

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

  const handleSearchCange = (searchKey) => {
    dispatch(updateSearchQuery(searchKey));
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
        //
        handleSearchCange={handleSearchCange}
        searchKey={filters.searchKey}
      />

      {/* {isLoading&&<Placeholder/>} */}

      {workers && hasVisibleData && (
        <Workers
          workers={workers}
          isBirthDateVisible={filters.sortBy === SORT_BY[1].value}
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
