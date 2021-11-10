import SearchBar from "../SearchBar";
import DepartmentsTab from "../DepartmentsTab";

function TopAppBar({
  isLoading,
  selectedDepId,
  handleDepartmentChange,
  checkedSortStrategy,
  handleSortByCange,
  handleSearchCange,
  searchKey,
}) {
  return (
    <>
      <SearchBar
        checkedSortStrategy={checkedSortStrategy}
        handleSortByCange={handleSortByCange}
        //
        handleSearchCange={handleSearchCange}
        searchKey={searchKey}
      />
      <DepartmentsTab
        isLoading={isLoading}
        selectedDepId={selectedDepId}
        handleDepartmentChange={handleDepartmentChange}
      />
    </>
  );
}

export default TopAppBar;
