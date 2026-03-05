import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";


const EmployeeTable = ({
  employees,
  loading,
  onDelete,
  setSearchId,
  searchId
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <>
          <TextField
  label="Search Employee by ID"
  variant="outlined"
  value={searchId}
  onChange={(e) => setSearchId(e.target.value)}
  sx={{ marginBottom: 2 }}
/>
      <Typography align="center" mt={4}>
        No employees found
      </Typography>
      </>
    );
  }

  return (   
    <>
              <TextField
  label="Search Employee by ID"
  variant="outlined"
  value={searchId}
  onChange={(e) => setSearchId(e.target.value)}
  sx={{ marginBottom: 2 }}
/>
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Mobile</strong></TableCell>
            <TableCell><strong>Country</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.mobile}</TableCell>
              <TableCell>{emp.country}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={() => onDelete(emp.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default EmployeeTable;