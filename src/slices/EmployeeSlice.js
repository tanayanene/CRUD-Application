  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axiosInstance from "../axiosInstance";

  export const fetchEmployees = createAsyncThunk(
    "employee/fetchEmployees",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("/employee");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Fetch failed");
      }
    }
  );

  export const addEmployee = createAsyncThunk(
    "employee/addEmployee",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/employee", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Add failed");
      }
    }
  );

  export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (id, { rejectWithValue }) => {
      try {
        await axiosInstance.delete(`/employee/${id}`);
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Delete failed");
      }
    }
  );

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/employee/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  },
);

  const employeeSlice = createSlice({
    name: "employee",
    initialState: {
      list: [],
      fetchLoading: false,
      addLoading: false,
      deleteLoading: false,
      updateLoading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchEmployees.pending, (state) => {
          state.fetchLoading = true;
          state.error = null;
        })
        .addCase(fetchEmployees.fulfilled, (state, action) => {
          state.fetchLoading = false;
          state.list = action.payload;
        })
        .addCase(fetchEmployees.rejected, (state, action) => {
          state.fetchLoading = false;
          state.error = action.payload;
        })

        .addCase(addEmployee.pending, (state) => {
          state.addLoading = true;
          state.error = null;
        })
        .addCase(addEmployee.fulfilled, (state, action) => {
          state.addLoading = false;
          state.list.push(action.payload);
        })
        .addCase(addEmployee.rejected, (state, action) => {
          state.addLoading = false;
          state.error = action.payload;
        })

        .addCase(deleteEmployee.pending, (state) => {
          state.deleteLoading = true;
          state.error = null;
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
          state.deleteLoading = false;
          state.list = state.list.filter((emp) => emp.id !== action.payload);
        })
        .addCase(deleteEmployee.rejected, (state, action) => {
          state.deleteLoading = false;
          state.error = action.payload;
        })

        .addCase(updateEmployee.pending, (state) => {
          state.updateLoading = true;
          state.error = null;
        })

        .addCase(updateEmployee.fulfilled, (state, action) => {
          state.updateLoading = false;

          state.list = state.list.map((emp) =>
            emp.id === action.payload.id ? action.payload : emp,
          );
        })

        .addCase(updateEmployee.rejected, (state, action) => {
          state.updateLoading = false;
          state.error = action.payload;
        })
        
    },
  });

  export default employeeSlice.reducer;