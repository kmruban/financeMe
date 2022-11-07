import React from "react";
import Topbar from "../components/topbar/Topbar";
import Footer from "../components/footer/Footer";

function DefaultLayout(props) {
  return (
    <div className="default_layout_app">
      <header>
        <Topbar />
      </header>
      <main>
        {props.children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default DefaultLayout;
