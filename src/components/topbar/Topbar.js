import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./topbar.scss";
import { Context } from "../../Context";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";

function Topbar() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { userInfo } = state;
  userInfo.firstname =
    userInfo.firstname[0].toUpperCase() + userInfo.firstname.substring(1);
  userInfo.lastname =
    userInfo.lastname[0].toUpperCase() + userInfo.lastname.substring(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(true);

  function dropdown() {
    setShowDropdown(!showDropdown);
  }

  function menuButton() {
    dropdown();
    setShowMenuButton(!showMenuButton);
  }

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  return (
    <div className="topbar">
      <div className="left">
        <NavLink to="/">
          <h2 className="finance">Finance</h2>
          <h2 className="me">Me</h2>
        </NavLink>
      </div>
      <div className="right">
        <div className="links">
          <div className="dropdown_container">
            <div className="dropdown_user">
              <div>
                <FaUserCircle className="user" />
                <p>{userInfo.firstname + " " + userInfo.lastname}</p>
              </div>
              {showMenuButton ? (
                <HiMenu onClick={menuButton} className="open_menu" />
              ) : (
                <MdClose onClick={menuButton} className="close_menu" />
              )}
            </div>
            {showDropdown ? (
              <div className="dropdown">
                <ul>
                  <li>
                    <NavLink className="dropdown_link" to="/">
                      - HOME
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown_link" to="/account">
                      - ACCOUNT
                    </NavLink>
                  </li>
                  <li onClick={signoutHandler}>- LOGOUT</li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
