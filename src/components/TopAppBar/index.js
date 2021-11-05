import SearchBar from "../SearchBar";
import DepartmentsTab from "../DepartmentsTab";

function TopAppBar({
  selectedDepartment,
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
        selectedDepartment={selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
      />
    </>
  );
}

export default TopAppBar;
