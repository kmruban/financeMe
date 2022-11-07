import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../Context";
import LoginRegisterLayout from "../../layouts/LoginRegisterLayout";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch: ctxDispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://apifinanceme.com/api/Users/login",
        {
          username,
          password,
        }
      );
      ctxDispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("Login Successful");
      toast.success("Login Successful");
      navigate("/");
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
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div>
            <label>
              <b>Username: </b>
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
            <button type="submit">LOGIN</button>
            <Link to="/register">
              Not Registered Yet, Click Here To Register
            </Link>
          </div>
        </div>
      </form>
    </LoginRegisterLayout>
  );
}

export default Login;
