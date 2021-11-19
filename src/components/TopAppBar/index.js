import SearchBar from "../SearchBar";
import DepartmentsTab from "../DepartmentsTab";

function TopAppBar({
  isLoading,
  searchBarHandlers,
  departmentsTabsHandler,
  appliedFilters,
}) {
  const {
    searchKey,
    sortBy: checkedSortStrategy,
    selectedDepId,
  } = appliedFilters;
  return (
    <>
      <SearchBar
        handleSearchCange={searchBarHandlers.handleSearchCange}
        searchKey={searchKey}
        checkedSortStrategy={checkedSortStrategy}
        handleSortChange={searchBarHandlers.handleSortChange}
      />
      <DepartmentsTab
        isLoading={isLoading}
        selectedDepId={selectedDepId}
        handleDepartmentChange={departmentsTabsHandler.handleDepartmentChange}
      />
    </>
  );
}

export default TopAppBar;
