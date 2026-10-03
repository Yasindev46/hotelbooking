import React,{useEffect} from 'react';
import "./Header.css"
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {logoutUser,reset} from "../../features/auth"

const Header = () => {
  const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
    }, [user,navigate]);

const handleLogout=async()=>{
dispatch(logoutUser())
dispatch(reset())
}

  return (
    <div className='header-container'>
      <Link to='/'>
      <h2 className='logo'>JEESHAN Hotel</h2>
      </Link>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/rooms'>Rooms</Link>
        {user? 
        <>
        <Link to='/allbookings'>Bookings</Link>
        <Link to='/rooms/create'>Create Room</Link>
        <button onClick={handleLogout}>Logout</button>
        </>
        :<>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        
        </>}
      </nav>
    </div>
  );
}

export default Header;
