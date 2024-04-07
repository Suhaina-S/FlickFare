import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LoginForm from './Login';  // Change the import alias
import img2 from './pics/img2.jpeg'; // Import the image file


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add your login logic here using the email and password state values
    // For example: call an API to authenticate the user
    axios.post('http://localhost:3001/login', { email, password })
      .then((result) => {
        console.log(result.data);
        if (result.data === "Success") {
            navigate('/moviebooking');
        }
        
        // Add any additional logic you need after a successful login
      })
      .catch((error) => {
        console.error("Error during login:", error);
        // Handle errors, display a message to the user, etc.
      })
      .finally(() => {
        // Reset the form after submission
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="position-relative d-flex justify-content-center align-items-center bg-secondary vh-100" style={{ opacity: "1" }}>
    <img src={img2} alt="Login" className="position-absolute top-0 start-0 w-100 h-100 object-cover opacity-1000" />
    <div className="bg-white p-3 rounded w-25 z-index-1" style={{ zIndex: "2", backgroundColor: "red",opacity:"0.9" }}>

        <h2><center>Login</center></h2>
        <form onSubmit={handleSubmit}>
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
          <button
  type="submit"
  className="btn btn-link btn-success text-decoration-none w-100 rounded-8"
  style={{ backgroundColor: "lightblue", padding: "10px 20px" }} // Adjust padding as needed
  onClick={() => navigate("/moviebooking")}
>
  Login
</button>


          <p>Don't have an account?</p>
          <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Signup
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Login;
