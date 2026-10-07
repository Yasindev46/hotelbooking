import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
export const createRoom=createAsyncThunk('rooms/create',async(roomData,thunkApi)=>{
try {
    
    const res = await fetch(`${apiUrl}/rooms`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(roomData),
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
})

export const getallRooms=createAsyncThunk('rooms/getall',async(__,thunkApi)=>{
try {
    const res = await fetch(`${apiUrl}/rooms`);
    const data=res.json()
    return data

    
} catch (error) {
    return thunkApi.rejectWithValue(error.message);
}
})

export const updateRoom=createAsyncThunk('rooms/update',async(roomData,thunkApi)=>{
  try {
      const {roomId,...rest}=roomData

      const res = await fetch(`${apiUrl}/rooms/${roomId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(rest),
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
  })

  export const deleteRoom=createAsyncThunk('rooms/delete',async(roomId,thunkApi)=>{
    try {
  
        const res = await fetch(`${apiUrl}/rooms/${roomId}`, {
            method: "DELETE",
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
    })
  


const initialState={
    rooms:[],
    isLoading: false,
    isSuccesss: false,
    isError: false,
    message: "",
  };
  
  export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccesss = false;
        state.message = "";
      },
    },
    extraReducers:builder=>{
    builder
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccesss = true;
        state.rooms = action.payload;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isError = true;
        state.isSuccesss = false;
        state.message = action.payload;
      })
      .addCase(getallRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccesss = true;
        state.rooms=action.payload;
      })
      .addCase(getallRooms.rejected, (state, action) => {
        state.isError = true;
        state.isSuccesss = false;
        state.message = action.payload;
      })
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccesss = true;
        state.rooms=action.payload;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isError = true;
        state.isSuccesss = false;
        state.message = action.payload;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccesss = true;
        state.rooms=state.rooms.filter((room)=>room._id!==action.payload.id);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isError = true;
        state.isSuccesss = false;
        state.message = action.payload;
      })
    }
})

export const {reset}=roomSlice.actions
export default roomSlice.reducer
