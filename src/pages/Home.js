import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "../components/Footer/Footer";
import Table from "../components/Table/Table";
import SideBar from "../components/SideBar/SideBar";
import { useSelector } from "react-redux";
import iconHome from "../assets/icon-sidebar-home.png";
import iconLaporan from "../assets/icon-sidebar-laporan.png";
import iconTTD from "../assets/icon-sidebar-ttd.png";
import iconVerify from "../assets/icon-verify.png";
import iconRevisi from "../assets/icon-revisi.png";
import iconKirim from "../assets/icon-sidebar-kirim.png";
import iconSelesai from "../assets/icon-sidebar-selesai.png";
import CardHomeLaporan from "../components/CardHomeLaporan/CardHomeLaporan";

function Home() {
  const navigation = useNavigate();
  const token = Cookies.get("token");
  const { data } = useSelector((state) => state.dummyData);

  const dataPerluVerifikasi = data
    .filter((item) => {
      return item.status_verifikasi == "BELUM";
    })
    .map((item) => item);
  const dataPerluDikirim = data
    .filter((item) => {
      return item.status_kirim == "BELUM";
    })
    .map((item) => item);

  const dataButuhTTD = data
    .filter((item) => {
      return item.status_ttd == "BELUM";
    })
    .map((item) => item);

  const dataSelesai = data
    .filter((item) => {
      return item.status_kirim == "SUDAH";
    })
    .map((item) => item);

  useEffect(() => {
    if (!token) {
      navigation("/login");
      window.location.reload();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <NavBar />
      <div className="d-flex flex-row justify-content-center">
        <div
          className="pt-3"
          style={{ width: "17%", borderRight: "2px solid #A19F9F" }}
        >
          <SideBar />
        </div>
        <main
          className="main pt-5 pb-5 px-2"
          style={{ width: "83%", height: "100vh" }}
        >
          <div className="w-100 d-flex justify-content-center mt-5 flex-row flex-wrap align-items-center gap-5">
            <CardHomeLaporan
              img={iconLaporan}
              size={data.length}
              url={"/reports"}
              label={"Total Naskah Aktif"}
            />
            <CardHomeLaporan
              img={iconVerify}
              size={dataPerluVerifikasi.length}
              url={"/reports-verifikasi"}
              label={"Total Naskah Perlu Verifikasi"}
            />
            <CardHomeLaporan
              img={iconKirim}
              size={dataPerluDikirim.length}
              url={"/reports-verifikasi"}
              label={"Total Naskah Perlu Dikirim"}
            />
            <CardHomeLaporan
              img={iconTTD}
              size={dataButuhTTD.length}
              url={"/reports-ttd"}
              label={"Total Naskah Perlu Di Tandatangan"}
            />
            <CardHomeLaporan
              img={iconRevisi}
              size={dataButuhTTD.length}
              url={"/reports-revisi"}
              label={"Total Naskah Perlu Di Revisi"}
            />
            <CardHomeLaporan
              img={iconSelesai}
              size={dataSelesai.length}
              url={"/reports-revisi"}
              label={"Total Naskah Selesai"}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;
