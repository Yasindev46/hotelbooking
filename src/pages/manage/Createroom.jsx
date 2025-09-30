import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { isSession, useNavigate } from 'react-router-dom';
import { createRoom,reset } from '../../features/Room/roomSlice';

const Createroom = () => {
    const { isSuccesss } = useSelector((state) => state.room);
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [formData,setFromData]=useState({
        name:"Delux",
        price:3000,
        desc:"Delux bed",
        roomNumbers:'201,202,301'
    })

    const {name,price,desc,roomNumbers}=formData

    useEffect(() => {
      if (isSuccesss) {
        dispatch(reset())
          navigate("/rooms");
      }
    }, [isSuccesss,dispatch,navigate]);

const handleChange=(e)=>{
    setFromData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }))
}
const handleSubmit=async(e)=>{
    e.preventDefault();
    const roomArray=roomNumbers.split(",").map((item)=>{
        return {number:parseInt(item) , availableDates:[]}
    })
    const datatoSubmit={ name,price,desc,roomNumbers:roomArray }
    dispatch(createRoom(datatoSubmit))
}
  return (
    <div className='create-container'>
        <h1 className='text-center'>Create Room</h1>
        <div className='form-wrapper'>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Enter your room name' name='name' value={name} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input type="text" placeholder='Enter room price' name='price' value={price} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="desc">Description</label>
            <textarea name='desc' value={desc} onChange={handleChange} > </textarea>
          </div>
          <div className="input-group">
            <label htmlFor="roomnumbers">Room numbers</label>
            <textarea name='roomnumbers' placeholder='enter room numbers seperate by comma Ex:- 202, 203' value={roomNumbers} onChange={handleChange} > </textarea>
          </div>
          <button type='submit'>Create</button>
        </form>

      </div>

    </div>
  );
}

export default Createroom;
