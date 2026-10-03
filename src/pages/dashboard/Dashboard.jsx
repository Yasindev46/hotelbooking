import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getallBookings } from "../../features/Bookings/bookingSlice";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user,navigate]);

  useEffect(()=>{
    dispatch(getallBookings())
  },[dispatch])
  return (
    <div>
      <h1 className='text-header-center'>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
