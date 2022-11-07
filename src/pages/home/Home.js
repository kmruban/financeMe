import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import "./home.scss";
import Intro from "../../components/intro/Intro";
import Transactions from "../../components/transactions/Transactions";
import Summary from "../../components/summary/Summary";

function Home() {
  return (
    <DefaultLayout>
      <div className="home">
        <Intro />
        <div className="content-wrapper">
          <Transactions />
          <Summary />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Home;
