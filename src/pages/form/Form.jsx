import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployee, updateEmployee } from "../../slices/EmployeeSlice";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  Box
} from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 600,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, textAlign: "center", fontWeight: 600 }}
        >
          Add Employee
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                {...register("email", {
                  required: "Email is required",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile"
                fullWidth
                {...register("mobile", {
                  required: "Mobile is required",
                })}
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                fullWidth
                {...register("state", {
                  required: "State is required",
                })}
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Country"
                fullWidth
                sx={{ minWidth: 225 }}
                {...register("country", {
                  required: "Country is required",
                })}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                <MenuItem value="">
                  <em>Select Country</em>
                </MenuItem>

                {countryList?.map((c, index) => (
                  <MenuItem key={index} value={c.country}>
                    {c.country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="District"
                fullWidth
                {...register("district", {
                  required: "District is required",
                })}
                error={!!errors.district}
                helperText={errors.district?.message}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 1,
              }}
            >
              <Button variant="outlined" onClick={() => navigate("/")}>
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Box>
  );
};


export default EmployeeForm;