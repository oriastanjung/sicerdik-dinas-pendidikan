import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "../components/Footer/Footer";
import Table from "../components/Table/Table";

function Home() {
  const navigation = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigation("/login");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <NavBar />
      <main className="main pt-5 pb-5" style={{ height: "100vh" }}>
        <div className="container main-container bg-white p-5">
          <div className="mx-5 mt-3 mb-4">
            <h2 className="pb-3">Daftar Laporan</h2>
          </div>
          <div className="container table-container panel panel-default">
            <Table />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
