import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButton = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("invalid credentials");
    } else {
      window.alert("login successfull");
      document.cookie = `user=${data.token};`
      navigate("/secret");
    }
  };
  return (
    <form className="row g-3">
      <div className="col-md-2">
        <label for="StudentId" className="form-label">
          Student Id
        </label>
        <input
          type="number"
          onChange={(e) => setStudentId(e.target.value)}
          name="studentId"
          value={studentId}
          className="form-control"
          id="StudentId"
        />
      </div>
      <div className="col-md-6">
        <label for="inputPassword4" className="form-label">
          Password
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          className="form-control"
          id="inputPassword4"
        />
      </div>
      <div className="col-12">
        <button
          type="submit"
          onClick={handleLoginButton}
          className="btn btn-primary"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
