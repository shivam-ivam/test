import React from "react";
import { Link , useNavigate} from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
        document.cookie = "user=;";
        navigate("/")
  }
  return (
    <>
      <nav>
        <Link to="/">home</Link>
        <br />
        <Link to="/login">login</Link>
        <br />
        <Link to="/signup">signup</Link>
        <br />
        <Link to="/secret">secret</Link>
        <br />
        <Link onClick={handleLogout} to="/">logout</Link>
      </nav>
    </>
  );
}
