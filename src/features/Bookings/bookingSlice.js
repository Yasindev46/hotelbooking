import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    booking:null,
    bookings:[],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

}


export const createBooking=createAsyncThunk('booking/create',async(bookingData,thunkApi)=>{
    try {
        const res = await fetch("http://localhost:4040/api/bookings", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(bookingData),
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

    export const getallBookings=createAsyncThunk('booking/getall',async(__,thunkApi)=>{
        try {
            const res = await fetch("http://localhost:4040/api/bookings")
            const data=res.json()
            return data
            
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
        })

        export const deleteBooking = createAsyncThunk('booking/delete', async (bookingId, thunkApi) => {
          try {
            const res = await fetch(`http://localhost:4040/api/bookings/${bookingId}`, {
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
        });

        export const updateBooking = createAsyncThunk('booking/update', async ({ bookingId, bookingData }, thunkApi) => {
          try {
            const res = await fetch(`http://localhost:4040/api/bookings/${bookingId}`, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "PUT",
              body: JSON.stringify(bookingData),
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
        });
  export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      },
    },
    extraReducers:builder=>{
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getallBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings=action.payload;
      })
      .addCase(getallBookings.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
    .addCase(deleteBooking.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteBooking.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.bookings = state.bookings.filter((booking) => booking._id !== action.payload);
    })
   
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
        state.bookings = state.bookings.map((booking) =>
        booking._id === action.payload._id ? action.payload : booking
        );
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
    
    }
})

export const {reset}=bookingSlice.actions
export default bookingSlice.reducer
