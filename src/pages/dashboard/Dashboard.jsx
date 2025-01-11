import React, { useEffect } from "react";
import { loginUser } from "../../features/auth";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { getallBookings,reset } from "../../features/Bookings/bookingSlice";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const {booking,isSuccess}=useSelector((state)=>state.booking)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(()=>{
    dispatch(getallBookings())
  },[])
  return (
    <div>
      <h1 className='text-header-center'>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
