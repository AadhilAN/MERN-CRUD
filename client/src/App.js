import React from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
