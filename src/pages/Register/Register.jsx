import React, { useState, useEffect } from "react";
import { registerUser, reset } from "../../features/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const handleChange = (e) => {
    setErrorMessage("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    const datatoSubmit = {
      name,
      email,
      password,
    };
    dispatch(registerUser(datatoSubmit));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      dispatch(reset())
    }
  }, [user, navigate, isSuccess, dispatch]);
  return (
    <div className="register-container">
      <h1 className="text-center">Register </h1>
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
            {errorMessage && (
              <p style={{ color: "red", fontSize: "14px" }}>Please enter name</p>
            )}
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
            {errorMessage && (
              <p style={{ color: "red", fontSize: "14px" }}>Please enter email</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="name">Password</label>
            <input
              type="text"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {errorMessage && (
              <p style={{ color: "red", fontSize: "14px" }}>Please enter password</p>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
