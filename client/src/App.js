import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Secret from "./components/Secret";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/secret" element={<Secret />} />
      </Routes>
    </>
  );
}

export default App;
