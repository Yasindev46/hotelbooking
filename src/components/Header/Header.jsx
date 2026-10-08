import React from 'react';
import "./Header.css"
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {logoutUser} from "../../features/auth"

const Header = () => {
  const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
      dispatch(logoutUser());
      navigate("/login", { replace: true });
    };

  return (
    <div className='header-container'>
      <Link to={user ? '/' : '/login'}>
      <h2 className='logo'>JEESHAN Hotel</h2>
      </Link>
      <nav>
        {user ?
        <>
        <Link to='/'>Home</Link>
        <Link to='/rooms'>Rooms</Link>
        <Link to='/allbookings'>Bookings</Link>
        <Link to='/rooms/create'>Create Room</Link>
        <button onClick={handleLogout}>Logout</button>
        </>
        : <>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        </>}
      </nav>
    </div>
  );
}

export default Header;
