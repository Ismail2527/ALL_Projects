import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import axios from "axios";
import toast from "react-hot-toast";

function Add() {
  // Initial state for user fields
  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
    pass: "",
  };

  const [user, setUser] = useState(initialUserState); // State to manage user input
  const [error, setError] = useState(null); // Error handling state
  const [loading, setLoading] = useState(false); // Loading state for async requests

  // Input change handler
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const naviage = useNavigate();

  // Form submission handler
  const submitForm = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error
    setLoading(true); // Set loading state

    // Validate form data before submitting
    if (!user.fname || !user.lname || !user.email || !user.pass) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      // Make POST request to backend API
      const response = await axios
        .post("http://localhost:3000/api/create", user)
        .then((res) => {
          toast.success(res.data.msg, { position: "top-right" });
          naviage("/");
        });
      console.log("User Created:", response.data);
      setUser(initialUserState); // Reset form after success
      setLoading(false); // End loading state
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again."); // Set error message
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"}>
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h3>Add New User</h3>

      {/* Display error if there is any */}
      {error && <div className="error">{error}</div>}

      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={user.fname}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="First Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={user.lname}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            id="pass"
            name="pass"
            value={user.pass}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Password"
          />
        </div>

        {/* Submit button with loading state */}
        <div className="inputGroup">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
