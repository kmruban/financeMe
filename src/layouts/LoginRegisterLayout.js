import React from "react";
import '../pages/login_register/LoginRegister.scss';

function LoginRegisterLayout(props) {
  return (
    <div className="login_register">
      {props.children}
    </div>
  );
}

export default LoginRegisterLayout;