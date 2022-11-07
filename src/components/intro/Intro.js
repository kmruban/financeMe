import React, { useContext } from "react";
import { MovingComponent } from "react-moving-text";
import { Context } from "../../Context";

function Intro() {
  const { state } = useContext(Context);
  const { userInfo } = state;
  return (
    <div className="intro">
      <MovingComponent
        type="fadeInFromLeft"
        duration="1000ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="1"
        fillMode="none"
        className="name"
      >
        Hello {" " + userInfo.firstname + " " + userInfo.lastname + ", "}
      </MovingComponent>
      <MovingComponent
        type="fadeInFromRight"
        duration="1000ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="1"
        fillMode="none"
        className="welcome"
      >
        Easily Track Your Finances With FinanceMe!
      </MovingComponent>
    </div>
  );
}

export default Intro;
