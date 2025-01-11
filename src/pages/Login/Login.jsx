import React,{useEffect, useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { loginUser,reset } from '../../features/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user,isSuccess} =useSelector((state) => state.auth);

  const [formData,setFormData]=useState({
      email:"",
      password:""
    })
  
    const{email,password}=formData

    const handleChange=(e)=>{
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }))
    }
  
    const handleSubmit=(e)=>{
      e.preventDefault();
      const datatoSubmit={ email, password }
      dispatch(loginUser(datatoSubmit))
    }
    useEffect(()=>{
      if(isSuccess){
        navigate('/rooms')
        dispatch(reset())
      }
    },[dispatch,isSuccess,user,navigate])
  return (
    <div className='login-container'>
      <h1 className='text-center'>Login</h1>
      <div className='form-wrapper'>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Email</label>
            <input type="text" placeholder='Enter your email' name='email' value={email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="name">Password</label>
            <input type="text" placeholder='Enter your password' name='password' value={password} onChange={handleChange} />
          </div>
          <button type='submit'>Login</button>
        </form>

      </div>
    </div>
  );
}

export default Login;
