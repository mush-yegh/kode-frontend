import SearchBar from "../SearchBar";
import DepartmentsTab from "../DepartmentsTab";

function TopAppBar({
  selectedDepartment,
  handleDepartmentChange,
  handleSortByCange,
}) {
  return (
    <>
      <SearchBar handleSortByCange={handleSortByCange} />
      <DepartmentsTab
        selectedDepartment={selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
      />
    </>
  );
}

export default TopAppBar;
