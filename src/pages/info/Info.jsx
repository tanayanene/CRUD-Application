import { useEffect,   useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../../slices/EmployeeSlice";
import { fetchCountries } from "../../slices/CountrySlice";
import EmployeeTable from "../../components/table/Table";

const Info = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.employee);
  const { countryList } = useSelector((state) => state.country)
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    dispatch(fetchCountries())
    dispatch(fetchEmployees())
  }, []); 

  const employeeData = list.map((item) => {
  const countryObj = countryList.find((country) => country.id === item.country)

    return {
      ...item,
      country: countryObj?.country || item.country
    }
  })

  const filteredEmployees = employeeData.filter((emp) =>
  emp.id.includes(searchId)
);

  const onDelete = (id) => {
    dispatch(deleteEmployee(id)) 
  }

  if (loading) return <p>Loading...</p>;

  return <EmployeeTable employees={filteredEmployees} onDelete={onDelete} setSearchId={setSearchId} searchId={searchId}/>;
};

export default Info;