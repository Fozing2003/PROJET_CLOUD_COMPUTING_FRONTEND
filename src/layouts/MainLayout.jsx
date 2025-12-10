import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
