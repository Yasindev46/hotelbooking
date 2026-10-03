import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { createBooking,reset } from "../../features/Bookings/bookingSlice";

const Bookroom = () => {
  const { id:roomId } = useParams();
  const {isSuccess}=useSelector((state)=>state.booking)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkinDate: "",
    checkoutDate: ""
  });

  const { name, email, checkinDate, checkoutDate } = formData;


  useEffect(()=>{
    if(isSuccess){
        dispatch(reset())
        navigate("/success")
        setTimeout(() => {
            navigate("/rooms")  
        }, 1000);
    }
  },[isSuccess])
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const dataToSubmit={
    roomId,
    name,
    email,
    checkinDate,
    checkoutDate,
    confirmed:true
}
    dispatch(createBooking(dataToSubmit))
  };

  return (
    <div className="bookroom-container">
      <h1 className="text-center">Book Now</h1>
      
      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">checkinDate</label>
            <input
              type="date"
              placeholder="Enter your date"
              name="checkinDate"
              value={checkinDate}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">checkOutDate</label>
            <input
              type="date"
              placeholder="Enter your date"
              name="checkoutDate"
              value={checkoutDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Bookroom;
