import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import FormCard from "../components/FormCard/FormCard";
function Detail() {
  const { id } = useParams();
  const navigation = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      return navigation("/login");
      //   window.reload();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <NavBar />
      <main className="main pt-5 pb-5">
        <FormCard>
          <div className="mx-5 mt-3 mb-4">
            <h2 className="pb-3">Detail Laporan {id}</h2>
          </div>
        </FormCard>
      </main>
      <Footer />
    </>
  );
}

export default Detail;
