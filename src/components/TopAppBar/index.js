import SearchBar from "../SearchBar";
import DepartmentsTab from "../DepartmentsTab";

function TopAppBar({
  isLoading,
  searchBarHandlers,
  departmentTabsHandler,
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
        handleDepartmentChange={departmentTabsHandler.handleDepartmentChange}
      />
    </>
  );
}

export default TopAppBar;
