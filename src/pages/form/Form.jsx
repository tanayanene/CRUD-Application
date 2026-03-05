import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, updateEmployee } from "../../slices/EmployeeSlice";

const EmployeeForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { countryList } = useSelector((state) => state.country)
  const employees = useSelector((state) => state.employee.list);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

    useEffect(() => {
    if (id && employees.length > 0) {
        const emp = employees.find((e) => String(e.id) === String(id));

        if (emp) {
        reset({
            name: emp.name || "",
            email: emp.email || "",
            mobile: emp.mobile || "",
            country: emp.country || "",
            state: emp.state || "",
            district: emp.district || "",
        });
        }
    }
    }, [id, employees, reset]);

  const onSubmit = (data) => {
    if (id) {
        dispatch(updateEmployee({ id, data }))
    } else {
        dispatch(addEmployee(data))
    }
    navigate("/");
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label>Name</label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters required",
              },
              maxLength: {
                value: 50,
                message: "Maximum 50 characters allowed",
              },
            })}
          />
          <p>{errors.name?.message}</p>
        </div>

        <div>
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label>Mobile</label>
          <input
            {...register("mobile", {
              required: "Mobile is required",
              minLength: {
                value: 10,
                message: "Mobile must be 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Mobile must be 10 digits",
              },
            })}
          />
          <p>{errors.mobile?.message}</p>
        </div>

        <div>
          <label>Country</label>
          <select
            {...register("country", {
              required: "Country is required",
            })}
          >
            <option value="">Select Country</option>
            {countryList.map((c, index) => (
              <option key={index} value={c.country}>
                {c.country}
              </option>
            ))}
          </select>
          <p>{errors.country?.message}</p>
        </div>

        <div>
          <label>State</label>
          <input
            {...register("state", {
              required: "State is required",
            })}
          />
          <p>{errors.state?.message}</p>
        </div>

        <div>
          <label>District</label>
          <input
            {...register("district", {
              required: "District is required",
            })}
          />
          <p>{errors.district?.message}</p>
        </div>

        <button type="submit">
          {id ? "Update Employee" : "Add Employee"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>
    </div>
  );

};


export default EmployeeForm;