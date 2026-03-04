import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./slices/CountrySlice";
import employeeReducer from "./slices/EmployeeSlice"

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    country: countryReducer,
  },
});
