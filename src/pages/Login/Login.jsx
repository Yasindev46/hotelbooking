import React,{useEffect, useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { loginUser,reset } from '../../features/auth';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user,isSuccess,message} =useSelector((state) => state.auth);

  const [formData,setFormData]=useState({
      email:"",
      password:""
    })
  
    const{email,password}=formData

    const handleChange=(e)=>{
      dispatch(reset())
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
      }))
    }
  const [showPassword, setShowPassword] = useState(false);
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
      {message && (
        <div style={{
          background: "#ffdddd",
          color: "#d8000c",
          padding: "10px",
          textAlign: "center",
          marginBottom: "15px",
          borderRadius: "5px"
        }}>{console.log("message===>",message)}
          {message}
        </div>
      )}
      <h1 className='text-center'>Login</h1>
      <div className='form-wrapper'>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Email</label>
            <input type="text" placeholder='Enter your email' name='email' value={email} onChange={handleChange} />
          </div>
          {/* <div className="input-group">
            <label htmlFor="name">Password</label>
            <input type="password" placeholder='Enter your password' name='password' value={password} onChange={handleChange} />
          </div> */}
          <div className="input-group" style={{ position: "relative" }}>
            <label htmlFor="name">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Enter your password'
              name='password'
              value={password}
              onChange={handleChange}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer"
              }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type='submit'>Login</button>
        </form>

      </div>
    </div>
  );
}

export default Login;
