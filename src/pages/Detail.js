import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import FormCard from "../components/FormCard/FormCard";
import ViewSuratCard from "../components/ViewSuratCard/ViewSuratCard";
import Form from "react-bootstrap/Form";
import ButtonFormView from "../components/ButtonFormView/ButtonFormView";

function Detail() {
  const { id } = useParams();
  const navigation = useNavigate();
  const token = Cookies.get("token");
  const [penandaTangan, setPenandatangan] = useState();
  const handleChange = (e) => {
    if (token) {
      setPenandatangan(e.target.value);
      // props.changeSelected(e.target.value);
    } else {
      navigation("/login");
    }
  };
  return (
    <>
      <NavBar />
      <main className="main pt-5 pb-5">
        <FormCard>
          <div className="mx-4 mt-3 mb-4 formCardHead">
            <h3 className="pb-3">Verifikasi Laporan id-{id}</h3>
          </div>
          <div className="mx-5 mt-3 mb-4">
            <ViewSuratCard label={"Surat Permohonan Orangtua"} />
            <ViewSuratCard label={"Surat Keterangan Pindah Sekolah"} />
            <ViewSuratCard label={"Surat Keterangan PLH Kepala Sekolah"} />
            <div className="verifikasiPenandatangan">
              <h4 className="ms-3">Pilih Penandatangan :</h4>
              <Form.Select onChange={handleChange}>
                <option value={"Ketua Sub Bagian"}>Ketua Sub Bagian </option>
                <option value={"Sekretaris DISDIK"}>Sekretaris DISDIK </option>
              </Form.Select>
            </div>
            <div className="formLaporanAction d-flex justify-content-end align-items-end flex-column my-4 gap-3 ">
              <div>
                <ButtonFormView>Verifikasi</ButtonFormView>
              </div>
              <p>*Verifikasi berkas dilakukan oleh Staff</p>
            </div>
          </div>
        </FormCard>
        <FormCard>
          <div className="mx-4 mt-3 mb-4 formCardHead">
            <h3 className="pb-3">Form Tanda Tangan Elektronik {"(TTE)"}</h3>
          </div>
          <div className="mx-5 mt-3 mb-4">
            <div className="formLaporanAction d-flex justify-content-end align-items-end flex-column my-4 gap-3 ">
              <div>
                <ButtonFormView isPrimary>Proses TTE</ButtonFormView>
              </div>
              <p>*Pastikan anda adalah orang yang harus menandatangani</p>
            </div>
          </div>
        </FormCard>
      </main>
      <Footer />
    </>
  );
}

export default Detail;
