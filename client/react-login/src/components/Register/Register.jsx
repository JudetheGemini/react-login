/* eslint-disable react/no-unescaped-entities */
import "./Register.css";
import "../../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// Importing assets
import video from "../../LoginAssets/video.mp4";
import logo from "../../LoginAssets/logo.png";

//Importing Icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
// import { response } from "express";

let Register = () => {
  // setting state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);
  // change handler in form
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  //Successful Registration Toast
  // const notify = () => toast("Registration Successful");

  // submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const data = await fetch("http://localhost:3001/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   if (data.status == 500) {
    //     setRegistrationStatus("error");
    //     console.log("failure");
    //   } else console.log("Save Successful");
    //   setRegistrationStatus("success");
    // } catch (error) {
    //   console.log("Error");
    // }

    axios
      .post("http://localhost:3001/api/register", formData)
      .then((response) => {
        setRegistrationStatus("success");
        console.log("Response:", response.data);
      })
      .catch((error) => {
        setRegistrationStatus("error");
        console.error("Error:", error);
      });
  };

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title"> Create and Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Already a member?</span>
            <Link to={"/"}>
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image"></img>
            <h3>Welcome</h3>
          </div>

          <form action="" className="form grid" onSubmit={handleSubmit}>
            {registrationStatus === "success" && (
              <span className="showSuccessMessage">
                Registration Successful
              </span>
            )}

            {registrationStatus === "error" && (
              <span className="showErrorMessage">Registration Failed</span>
            )}

            <div className="inputDiv">
              <label htmlFor="username">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className="icon" />
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter Username"
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <button type="submit" className="btn flex">
              <span>Register</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
