import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const res = await fetch("http://localhost:4040/api/users", {
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
        const res = await fetch("http://localhost:4040/api/users/login", {
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

export const logoutUser=createAsyncThunk("auth/logout",async(_,thunkApi)=>{
    try {
        const res = await fetch("http://localhost:4040/users/logout");
        if (!res.ok) {
          const err = await res.json();
          return thunkApi.rejectWithValue(err);
        }
  
        const data =await res.json();
        localStorage.removeItem("user")
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
})

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
        state.user = action.payload;
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
        state.isLoading=true
      })
      .addCase(logoutUser.fulfilled,(state,action)=>{
        state.isError=false
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logoutUser.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
