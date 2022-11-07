import React, { useContext } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Context } from "../../Context";

function Account() {
  const { state } = useContext(Context);
  const { userInfo } = state;
  userInfo.firstname =
    userInfo.firstname[0].toUpperCase() + userInfo.firstname.substring(1);
  userInfo.lastname =
    userInfo.lastname[0].toUpperCase() + userInfo.lastname.substring(1);
  return (
    <DefaultLayout>
    ACCOUNT PAGE:
      <div>{"Hello " + userInfo.firstname + " " + userInfo.lastname}</div>
    </DefaultLayout>
  );
}

export default Account;
