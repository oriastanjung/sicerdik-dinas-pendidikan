import React, { useEffect } from "react";
import NavBarManajemenAkun from "../components/NavBarManajemenAkun/NavBarManajemenAkun";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "../components/Footer/Footer";
import TableUsers from "../components/TableUsers/TableUsers";

function Home() {
  const navigation = useNavigate();

  return (
    <>
      <NavBarManajemenAkun />
      <main className="main pt-5 pb-5">
        <div className="container main-container bg-white p-5">
          <div className="mx-5 mt-3 mb-4">
            <h2 className="pb-3">Manajemen Akun</h2>
          </div>
          <div className="container table-container panel panel-default">
            <TableUsers />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
