import React from 'react';
import "./App.css"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import Dashboard from './pages/dashboard/Dashboard';
import Createroom from './pages/manage/Createroom';
import Roomlist from './pages/manage/Roomlist';
import Room from "./pages/manage/Room"
import Rooms from './pages/manage/Rooms';
import Editroom from './pages/manage/Editroom';
import Bookroom from './pages/Bookings/Bookroom';
import Success from './pages/Register/Success';
import AllBookings from './pages/Bookings/Allbookings';
import Footer from './pages/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/rooms' element={<Rooms/>}/>
        <Route path='/rooms/create' element={<Createroom/>}/>
        <Route path='/rooms/getall' element={<Roomlist/>}/>
        <Route path='/rooms/getall/:id' element={<Room/>}/> 
        <Route path='/rooms/edit/:id' element={<Editroom/>}/> 
        <Route path='/bookings/:id' element={<Bookroom/>}/> 
        <Route path='/success' element={<Success/>}/> 
        <Route path='/allbookings' element={<AllBookings/>}/> 
      </Routes>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
