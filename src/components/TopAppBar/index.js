import SearchBar from "../SearchBar";
import DepartmentsTab from "../DepartmentsTab";

function TopAppBar({ selectedDepartment, handleDepartmentChange }) {
  return (
    <>
      <SearchBar />
      <DepartmentsTab
        selectedDepartment={selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
      />
    </>
  );
}

export default TopAppBar;
