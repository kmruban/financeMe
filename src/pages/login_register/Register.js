import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LoginRegisterLayout from "../../layouts/LoginRegisterLayout";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://apifinanceme.com/api/Users/register", {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      console.log(username);
      console.log(password);
      console.log("Registration Successful");
      toast.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <LoginRegisterLayout>
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div>
            <label>
              <b>First Name: </b>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Last Name: </b>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Email: </b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <b>Password: </b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="submit">
            <button type="submit">REGISTER</button>
            <Link to="/login">Already Registered, Click Here To Login</Link>
          </div>
        </div>
      </form>
    </LoginRegisterLayout>
  );
}

export default Register;
