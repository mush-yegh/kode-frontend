import SearchBar from "../SearchBar";
import DepartmentsTab from "../DepartmentsTab";

function TopAppBar({
  isLoading,
  selectedDepId,
  handleDepartmentChange,
  checkedSortStrategy,
  handleSortByCange,
}) {
  return (
    <>
      <SearchBar
        checkedSortStrategy={checkedSortStrategy}
        handleSortByCange={handleSortByCange}
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
