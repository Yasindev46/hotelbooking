import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {deleteBooking,reset} from "../../features/Bookings/bookingSlice";
import { useNavigate } from "react-router-dom";

const AllBookings = () => {
    const dispatch = useDispatch();

  const [allBooking, setAllBooking] = useState();
  const { isSuccess } = useSelector((state) => state.booking);

  const getBookings = async () => {
    try {
      const res = await fetch(`http://localhost:4040/api/bookings`);
      if (res.ok) {
        const data = await res.json();

        setAllBooking(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

const handleDelete = (id) => {
    dispatch(deleteBooking(id));
  };


  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      getBookings();
    }
  }, [isSuccess]);

  useEffect(() => {
    getBookings();
  }, []);


return (
    <div>
        <h1 className="text-center">All Bookings</h1>
        <table>
            <thead>
                <tr>
                    <th>Sl No</th>
                    <th>Booking ID</th>
                    <th>Customer Name</th>
                    <th>Customer Email</th>
                    <th>Room ID</th>
                    <th>Check-in Date</th>  
                    <th>Check-out Date</th>
                    <th>Confirmed</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {allBooking && allBooking.length > 0 ? (
                    allBooking.map((book, id) => {
                        return (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{book._id}</td>
                                <td>{book.name}</td>
                                <td>{book.email}</td>
                                <td>{book.roomId}</td>
                                <td>{new Date(book.checkinDate).toLocaleDateString()}</td>
                                <td>{new Date(book.checkoutDate).toLocaleDateString()}</td>
                                <td>{book.confirmed ? "Confirmed" : "Not Confirmed"}</td>
                            <td>
                                <button onClick={() => handleDelete(book._id)}>Delete</button>
                            </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center">No bookings available</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);
};

export default AllBookings;
