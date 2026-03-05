import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employees data
        </Typography>

        <Box>
          <Button onClick={() => navigate("/")} color="inherit">Employee Table</Button>
          <Button onClick={() => navigate("/employees/new")}  color="inherit">New Form</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;