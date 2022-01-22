import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const onHandleLoginSubmit = async () => {
    // handle submit

    if (username !== "" || password !== "" || "") {
      console.log(`${username} ${password}`);
      let accountRegObj = {};
      accountRegObj.username = username;
      accountRegObj.password = password;

      const response = await axios.post(
        "http://localhost:3001/login",
        accountRegObj
      );
      console.log(response.data);
      if (!(response.data.message === "Failed")) {
        if (response.data.data) {
          setUserDetails(response.data.data.username);
        }
      } else {
        setUserDetails(null);
        alert("Username or Password is incorrect");
      }
    } else {
      alert("All fields are Required");
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <h1>Login Page</h1>
          <FaUserAlt style={{ fontSize: "50px", paddingBottom: "10px" }} />
        </div>
        <div>
          <FaEnvelope className="inputDiv" />
          <input
            type="text"
            placeholder="user name"
            className="name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="second-input">
          <FaLock className="inputDiv" style={{ color: "black" }} />

          <input
            type="password"
            placeholder="password"
            className="name"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login-button">
          <button onClick={onHandleLoginSubmit}>Login</button>
          <p className="link">
            Don't have an account ? <Link to="/signup">Sign Up Here</Link>
          </p>
          {userDetails ? <h3>Hi {userDetails}</h3> : <p></p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
