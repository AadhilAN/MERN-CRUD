import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { FaUserAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

import { Link } from "react-router-dom";

function Signup() {
  const [fullNameReg, setFullNameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState("");

  const onHandleSubmit = async () => {
    if (
      fullNameReg !== "" ||
      usernameReg !== "" ||
      emailReg !== "" ||
      passwordReg !== "" ||
      confirmPasswordReg !== "" ||
      passwordNotMatch !== ""
    ) {
      console.log(
        `${fullNameReg} ${usernameReg} ${emailReg} ${passwordReg} ${confirmPasswordReg}`
      );

      if (passwordReg === confirmPasswordReg) {
        let accountRegObj = {};
        accountRegObj.fullName = fullNameReg;
        accountRegObj.username = usernameReg;
        accountRegObj.email = emailReg;
        accountRegObj.password = passwordReg;

        const response = await axios.post(
          "http://localhost:3001/register",
          accountRegObj
        );
        console.log(response.data);
        if (response.data.message === "Success") {
          window.location.assign("http://localhost:3000/login");
        }
      } else {
        alert("Password Mismatched");
      }
    } else {
      alert("All fields are Required");
    }
  };

  return (
    <div className="main signupPage ">
      <div className="sub-main signup">
        <div>
          <h1>Sign Up Page</h1>
          <FaUserAlt style={{ fontSize: "50px", paddingBottom: "10px" }} />
        </div>
        <div className="mainInput">
          <div>
            <FaUserTie className="inputDiv" />
            <input
              type="text"
              placeholder="Full name"
              className="name"
              onChange={(e) => {
                setFullNameReg(e.target.value);
              }}
            />
          </div>
          <div>
            <FaUserTie className="inputDiv" />
            <input
              type="text"
              placeholder="user name"
              className="name"
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />
          </div>
          <div>
            <FaEnvelope className="inputDiv" />
            <input
              type="text"
              placeholder="Email"
              className="name"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
            />
          </div>
          <div className="signup-password">
            <FaLock className="inputDiv" style={{ color: "black" }} />

            <input
              type="password"
              placeholder="password"
              className="name"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
          </div>
          <div className="confirm-password" style={{ paddingBottom: "15px" }}>
            <FaLock className="inputDiv" />

            <input
              type="password"
              placeholder="confirm password"
              className="name"
              onChange={(e) => {
                setConfirmPasswordReg(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="login-button">
          <button onClick={onHandleSubmit}>Sign up</button>
          <p className="link">
            Already have an account? <Link to="/">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
