import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData,
        {
          withCredentials: true,
        }
      ); // Assuming you have a '/login' endpoint in your backend
      if (response.data.msg === "User Logged In Successfully") {
        alert("User Logged In");
        window.location.href = "/";
      } else {
        alert("Wrong Creds");
      }
    } catch (error) {
      console.error("Error:", error); // Handle error here
    }
  };

  return (
    <div className="login-top">
      <div className="login-inner-top">
        <div className="login-title">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="user-input">
            <input
              type="text"
              placeholder="Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="user-input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="user-login">
            <button type="submit">Login</button>
          </div>
        </form>
        <div style={{ marginBlockStart: "1rem" }}>
          New Here ? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
