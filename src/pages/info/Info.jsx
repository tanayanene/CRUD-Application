import { useEffect,   useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../../slices/EmployeeSlice";
import { fetchCountries } from "../../slices/CountrySlice";
import EmployeeTable from "../../components/table/Table";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/deleteModal/DeleteModal";

const Info = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { list, loading } = useSelector((state) => state.employee);
  const { countryList } = useSelector((state) => state.country)
  const [searchId, setSearchId] = useState("");
const [openDelete, setOpenDelete] = useState(false);
const [selectedId, setSelectedId] = useState(null);

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

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteEmployee(selectedId));
    setOpenDelete(false);
  };

  const handleClose = () => {
  setOpenDelete(false);
};

  const onEdit = (id) => {
    navigate(`/employees/edit/${id}`)
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <EmployeeTable employees={filteredEmployees} onDelete={handleDeleteClick} onEdit={onEdit} setSearchId={setSearchId} searchId={searchId}/>
    <DeleteModal
    open={openDelete}
    onClose={handleClose}
    onConfirm={handleConfirmDelete}
    />
    </>
    )
};

export default Info;