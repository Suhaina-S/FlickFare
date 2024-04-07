import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import loginimg from './pics/loginimg.jpg'; // Import the image file

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(name.trim())) {
      alert("Name must contain only alphabetic characters.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // You can add your signup logic here using the name, email, and password state values
    // For example: call an API to register the user
    axios.post('http://localhost:3001/register', { name, email, password })
      .then((result) => {
        console.log(result.data);
        navigate('/login')
        // Add any additional logic you need after a successful signup
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        // Handle errors, display a message to the user, etc.
      })
      .finally(() => {
        // Reset the form after submission
        setName("");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="position-relative d-flex justify-content-center align-items-center bg-secondary vh-100" style={{ opacity: "1" }}>
      <img src={loginimg} alt="Login" className="position-absolute top-0 start-0 w-100 h-100 object-cover opacity-500" />
      <div className="bg-white p-3 rounded w-25 z-index-1" style={{ zIndex: "2", backgroundColor: "red",opacity:"0.9" }}>

        <h2><center>Register</center></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="form-control rounded-e"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control rounded-0"
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-8">
            Register
          </button>

          <p>Already Have an Account</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
