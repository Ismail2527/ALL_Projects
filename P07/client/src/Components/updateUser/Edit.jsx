import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../addUser/add.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Corrected import to use Toaster

function Edit() {
  const initialUser = {
    fname: "",
    lname: "",
    email: "",
  };

  const { id } = useParams();
  const [user, setUser] = useState(initialUser);

  // Fetch user data based on the user ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data); // Set user data to state
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch user data", { position: "top-right" }); // Show error toast if fetching fails
      });
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting

    // Basic validation
    if (!user.fname || !user.lname || !user.email) {
      toast.error("All fields are required!", { position: "top-right" });
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/update/${id}`,
        user
      );
      toast.success(res.data.msg, { position: "top-right" });
      navigate("/"); // Navigate after successful update
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user", { position: "top-right" }); // Show error toast if the update fails
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"}>
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            value={user.fname}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            value={user.lname}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onChange={inputChangeHandler}
            value={user.email}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Update User</button>
        </div>
      </form>

      {/* Use Toaster component instead of ToastContainer */}
      <Toaster position="top-right" />
    </div>
  );
}

export default Edit;
