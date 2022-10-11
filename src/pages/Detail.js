import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import FormCard from "../components/FormCard/FormCard";
import ViewSuratCard from "../components/ViewSuratCard/ViewSuratCard";
import Form from "react-bootstrap/Form";
import ButtonFormView from "../components/ButtonFormView/ButtonFormView";
import InputFormWithLabel from "../components/InputFormWithLabel/InputFormWithLabel";
import ViewStatusCard from "../components/ViewStatusCard/ViewStatusCard";

function Detail() {
  const { id } = useParams();
  const navigation = useNavigate();
  const token = Cookies.get("token");
  const [penandaTangan, setPenandatangan] = useState();
  const [formTTE, setFormTTE] = useState({
    nip: "",
    keyphrase: "",
  });

  const { data: allData } = useSelector((state) => state.dummyData);
  const targetData = allData.find((item) => item.id == id);

  const handleChangeFormTTE = (e) => {
    if (!token) {
      navigation("/login");
    } else {
      setFormTTE(() => {
        return { ...formTTE, [e.target.name]: e.target.value };
      });
    }
  };

  const handleClickFormTTE = () => {
    console.log("all data ==", allData);
    console.log("targetData ==", targetData);
    console.log("status verifikasi ==", targetData.status_verifikasi);
  };

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
            <ViewSuratCard
              label={"Surat Permohonan Orangtua"}
              pdfFile={targetData.surat_ortu}
            />
            <ViewSuratCard
              label={"Surat Keterangan Pindah Sekolah"}
              pdfFile={targetData.surat_pindah}
            />
            <ViewSuratCard
              label={"Surat Keterangan PLH Kepala Sekolah"}
              pdfFile={`${targetData.surat_plh && targetData.surat_plh}`}
            />
            {targetData.status_verifikasi === "BELUM" ||
            targetData.status_verifikasi === "belum" ||
            targetData.status_verifikasi === 0 ||
            targetData.status_verifikasi === false ? (
              <>
                <div className="verifikasiPenandatangan">
                  <h4 className="ms-3">Pilih Penandatangan :</h4>
                  <Form.Select onChange={handleChange}>
                    <option value={"Ketua Sub Bagian"}>
                      Ketua Sub Bagian{" "}
                    </option>
                    <option value={"Sekretaris DISDIK"}>
                      Sekretaris DISDIK{" "}
                    </option>
                  </Form.Select>
                </div>
                <div className="verifikasiPenandatangan">
                  <h4 className="ms-3">Jenis Surat yang akan Dikirim :</h4>
                  <Form.Select onChange={handleChange}>
                    <option value={"Surat Pindah Sekolah"}>
                      Surat Pindah Sekolah{" "}
                    </option>
                    <option value={"Surat Pindah Rayon"}>
                      Surat Pindah Rayon{" "}
                    </option>
                  </Form.Select>
                </div>
                <div className="formLaporanAction d-flex justify-content-end align-items-end flex-column my-4 gap-3 ">
                  <div>
                    <ButtonFormView>Verifikasi</ButtonFormView>
                  </div>
                  <p>*Verifikasi berkas dilakukan oleh Staff</p>
                </div>
              </>
            ) : (
              <p className="d-flex justify-content-center align-items-center text-status-form mt-5 mb-0">
                SUDAH TERVERIFIKASI
              </p>
            )}
          </div>
        </FormCard>

        <FormCard>
          <div className="mx-4 mt-3 mb-4 formCardHead">
            <h3 className="pb-3">Form Tanda Tangan Elektronik {"(TTE)"}</h3>
          </div>
          {targetData.status_ttd === "BELUM" ||
          targetData.status_ttd === "belum" ||
          targetData.status_ttd === false ||
          targetData.status_ttd === 0 ? (
            <>
              <div className="d-flex flex-row justify-content-between align-items-center mx-4 mt-3 mb-4 px-4 gap-5">
                <div className=" flex-grow-1">
                  <InputFormWithLabel
                    label={"Nomor Induk Pegawai"}
                    type={"number"}
                    name={"nip"}
                    placeholder={"Masukkan NIP"}
                    value={formTTE.nip}
                    onChange={handleChangeFormTTE}
                  />
                </div>

                <div>
                  <InputFormWithLabel
                    label={"Masukkan KEYPHRASE"}
                    type={"password"}
                    name={"keyphrase"}
                    placeholder={"Masukkan Keyphrase"}
                    value={formTTE.keyphrase}
                    onChange={handleChangeFormTTE}
                  />
                </div>
              </div>
              <div className="mx-5 mt-3 mb-4">
                <div className="formLaporanAction d-flex justify-content-end align-items-end flex-column my-4 gap-3 ">
                  <div>
                    <ButtonFormView
                      onClick={handleClickFormTTE}
                      isprimary={"true"}
                    >
                      Proses TTE
                    </ButtonFormView>
                  </div>
                  <p>*Pastikan anda adalah orang yang harus menandatangani</p>
                </div>
              </div>
            </>
          ) : (
            <p className="d-flex justify-content-center align-items-center text-status-form mt-5 mb-0">
              SUDAH DI TANDATANGANI
            </p>
          )}
        </FormCard>

        <FormCard>
          <div className="mx-4 mt-3 mb-4 formCardHead">
            <h3 className="pb-3">Status Laporan</h3>
          </div>
          <div className="mx-5 mt-3 mb-4">
            <ViewStatusCard
              label={"Status Verifikasi"}
              status={targetData.status_verifikasi}
            />
            <ViewStatusCard
              label={"Status Tanda Tangan Elektronik (TTE)"}
              status={targetData.status_ttd}
            />

            {targetData.status_kirim === "BELUM" ||
            targetData.status_kirim === "belum" ||
            targetData.status_kirim === false ||
            targetData.status_kirim === 0 ? (
              <div className="formLaporanAction d-flex justify-content-end align-items-end flex-column my-4 gap-3 ">
                <div>
                  <ButtonFormView>Kirim</ButtonFormView>
                </div>
                <p>*Pengiriman surat dilakukan oleh Staff</p>
              </div>
            ) : (
              <p className="d-flex justify-content-center align-items-center text-status-form mt-5 mb-0">
                SUDAH DIKIRIM
              </p>
            )}
          </div>
        </FormCard>
      </main>
      <Footer />
    </>
  );
}

export default Detail;
