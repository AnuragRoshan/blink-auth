import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error message when user starts typing
    setErrors({ ...errors, [name]: "" });
    console.log(formData);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    console.log(formData);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Name validation
    if (!formData.name) {
      errors.name = "Please enter your name";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.username || !emailRegex.test(formData.username)) {
      errors.username = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      isValid = false;
    }

    // // Image validation
    // if (!formData.image) {
    //   errors.image = "Please upload your image";
    //   isValid = false;
    // }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("username", formData.username);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("image", formData.image);

        const response = await axios.post(
          "http://localhost:5000/register",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data); // handle success response here
        if (response.data.msg === "User Added Successfully") {
          alert("User Added Successfully");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="login-top">
      <div className="login-inner-top">
        <div className="login-title">
          <h1>Signup</h1>
        </div>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="user-input">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p style={{ width: "20rem" }} className="error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="user-input">
            <input
              type="text"
              placeholder="Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div
                style={{ color: "red", maxWidth: "100%", textAlign: "left" }}
              >
                {" "}
                <p className="error">{errors.username}</p>
              </div>
            )}
          </div>
          <div className="user-input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div
                style={{ color: "red", maxWidth: "20rem", textAlign: "center" }}
              >
                {" "}
                <p className="error">{errors.password}</p>
              </div>
            )}
          </div>
          <div className="user-input" style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
              }}
            >
              Your Image
            </div>
            <div>
              <input type="file" name="image" onChange={handleFileChange} />
              {errors.image && <p className="error">{errors.image}</p>}
            </div>
          </div>
          <div className="user-login">
            <button type="submit">Signup</button>
          </div>
        </form>
        <div style={{ marginBlockStart: "1rem" }}>
          Already a user ? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
