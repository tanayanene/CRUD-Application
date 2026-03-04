import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../../slices/EmployeeSlice";
import EmployeeTable from "../../components/table/Table";

const Info = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []); 

  const onDelete = (id) => {
    dispatch(deleteEmployee(id)) 
  }

  if (loading) return <p>Loading...</p>;

  return <EmployeeTable employees={list} onDelete={onDelete}/>;
};

export default Info;