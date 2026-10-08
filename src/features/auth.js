import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const apiUrl = process.env.REACT_APP_API_URL;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const res = await fetch(`${apiUrl}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const err = await res.json();
        return thunkApi.rejectWithValue(err);
      }

      const data = res.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUser=createAsyncThunk("auth/login",async(userData,thunkApi)=>{
    try {
        const res = await fetch(`${apiUrl}/users/login`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(userData),
        });
        if (!res.ok) {
          const err = await res.json();
          return thunkApi.rejectWithValue(err);
        }
  
        const data =await res.json();
        localStorage.setItem("user",JSON.stringify(data))
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
})

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(loginUser.pending,(state,action)=>{
        state.isLoading=true
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.isError=false
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;

      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.message = "Email or Password is incorrect";
      })
      .addCase(logoutUser.pending,(state,action)=>{
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.user = null;
      })
      .addCase(logoutUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.error.message;
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
