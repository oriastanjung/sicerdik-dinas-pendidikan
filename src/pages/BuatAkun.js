import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import NavBarManajemenAkun from "../components/NavBarManajemenAkun/NavBarManajemenAkun";
import InputFormWithLabel from "../components/InputFormWithLabel/InputFormWithLabel";
import InputWithSelect from "../components/InputWithSelect/InputWithSelect";
import { Form } from "react-bootstrap";
import ButtonFormView from "../components/ButtonFormView/ButtonFormView";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function BuatAkun() {
  const navigation = useNavigate();
  const [jenisAkun, setJenisAkun] = useState("DISDIK");
  const [jabatan, setJabatan] = useState("");
  const handleChangeJenisAkun = (e) => {
    setJenisAkun(e.target.value);
  };
  const handleChangeJabatan = (e) => {
    setJabatan(e.target.value);
  };
  const handleCreateAkun = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Buatkan Akun ?",
      showDenyButton: true,
      confirmButtonText: "Buat",
      denyButtonText: `Batalkan`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Akun Berhasil Dibuat!", "", "success");
        navigation("/manajemen-akun/users");
        window.reload()
      }
    });
  };

  return (
    <>
      <NavBarManajemenAkun />

      <main className="main pt-5 pb-5">
        <div className="container main-container bg-white p-5">
          <div className="mx-5 mt-3 mb-4">
            <h2 className="pb-3">Buat Akun</h2>
          </div>
          <div className="container table-container panel panel-default">
            <form className="mx-5 d-flex flex-column gap-3 ">
              <div className="d-flex flex-column gap-2">
                <label className="label-select-akun">Tujuan Akun : </label>
                <Form.Select onChange={handleChangeJenisAkun}>
                  <option value={"DISDIK"}>DISDIK </option>
                  <option value={"SEKOLAH"}>SEKOLAH</option>
                </Form.Select>
              </div>
              <InputFormWithLabel
                label={"Email"}
                type={"email"}
                name={"email"}
                placeholder={"example@gmail.com"}
                isRequired
              />
              <InputFormWithLabel
                label={"Password"}
                type={"password"}
                name={"password"}
                placeholder={"Masukkan Password"}
                isRequired
              />
              <InputFormWithLabel
                label={"NIK"}
                type={"number"}
                placeholder={"Masukkan NIK"}
                name={"nik"}
                isRequired
              />
              <InputFormWithLabel
                label={"NIP"}
                type={"number"}
                name={"nip"}
                placeholder={"Masukkan NIP"}
                isRequired
              />
              <InputFormWithLabel
                label={"Tempat Bekerja"}
                type={"text"}
                name={"tempat_bekerja"}
                placeholder={"Masukkan Tempat Bekerja Anda"}
                isRequired
              />
              <div className="d-flex flex-column gap-3">
                <label className="label-select-akun">Jabatan Akun : </label>
                <Form.Select onChange={handleChangeJabatan}>
                  {jenisAkun === "DISDIK" ? (
                    <>
                      <option value={"Sekretaris DISDIK"}>
                        Sekretaris Disdik
                      </option>
                      <option value={"Kasubag DISDIK"}>Kasubag DISDIK</option>
                      <option value={"Staff DISDIK"}>Staff DISDIK</option>
                    </>
                  ) : (
                    <>
                      <option value={"Kepala Sekolah"}>Kepala Sekolah</option>
                      <option value={"Staff Sekolah"}>Staff Sekolah</option>
                    </>
                  )}
                </Form.Select>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-3">
                <ButtonFormView onClick={handleCreateAkun} isprimary>
                  Buat Akun
                </ButtonFormView>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BuatAkun;
