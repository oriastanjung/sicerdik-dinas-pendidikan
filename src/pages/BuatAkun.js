import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import NavBarManajemenAkun from "../components/NavBarManajemenAkun/NavBarManajemenAkun";
import InputFormWithLabel from "../components/InputFormWithLabel/InputFormWithLabel";
import InputWithSelect from "../components/InputWithSelect/InputWithSelect";
import { Form } from "react-bootstrap";
import ButtonFormView from "../components/ButtonFormView/ButtonFormView";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { apiPath } from "../config";
import Cookies from "js-cookie";
import { useEffect } from "react";
function BuatAkun() {
  const navigation = useNavigate();
  const [jenisAkun, setJenisAkun] = useState("DISDIK");
  const token = Cookies.get("token");
  const [form, setForm] = useState({
    email: "",
    password: "",
    nik: "",
    nip: "",
    tempat: "",
    role: "",
  });
  const [jabatan, setJabatan] = useState("sekretaris");
  const handleChangeJenisAkun = (e) => {
    setJenisAkun(e.target.value);
  };
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeJabatan = (e) => {
    setJabatan(e.target.value);
  };
  const makeAccount = async () => {
    try {
      const { email, password, nik, nip, tempat } = form;
      const payload = {
        email,
        password,
        confirmPassword: password,
        nik,
        nip,
        tempat,
        role: jabatan,
      };
      const data = axios.post(`${apiPath}/cms/akun`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateAkun = (e) => {
    const { email, password, nik, nip, tempat } = form;
    if (email && password && nik && nip && tempat && jabatan) {
      e.preventDefault();
      Swal.fire({
        title: "Buatkan Akun ?",
        showDenyButton: true,
        confirmButtonText: "Buat",
        denyButtonText: `Batalkan`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log("form >>> ", form);
          console.log("role >>> ", jabatan);
          makeAccount();
          Swal.fire("Akun Berhasil Dibuat!", "", "success");
          navigation("/manajemen-akun/users");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ada data yang tidak terisi!",
      });
    }
  };
  useEffect(() => {
    if (!token) {
      navigation("/login");
    }
  }, []);
  return (
    <>
      <NavBarManajemenAkun />

      <main className="main pt-5 pb-5">
        <div className="container main-container bg-white p-5">
          <div className="mx-5 mt-3 mb-4">
            <h2 className="pb-3">Buat Akun</h2>
          </div>
          <div className="container table-container panel panel-default">
            <div className="mx-5 d-flex flex-column gap-3 ">
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
                onChange={handleChangeForm}
                value={form.email}
                isRequired
              />
              <InputFormWithLabel
                label={"Password"}
                type={"password"}
                name={"password"}
                onChange={handleChangeForm}
                placeholder={"Masukkan Password"}
                value={form.password}
                isRequired
              />
              <InputFormWithLabel
                label={"NIK"}
                type={"number"}
                placeholder={"Masukkan NIK"}
                name={"nik"}
                onChange={handleChangeForm}
                value={form.nik}
                isRequired
              />
              <InputFormWithLabel
                label={"NIP"}
                type={"number"}
                name={"nip"}
                value={form.nip}
                placeholder={"Masukkan NIP"}
                onChange={handleChangeForm}
                isRequired
              />
              <InputFormWithLabel
                label={"Tempat Bekerja"}
                type={"text"}
                name={"tempat"}
                onChange={handleChangeForm}
                value={form.tempat}
                placeholder={"Masukkan Tempat Bekerja Anda"}
                isRequired
              />
              <div className="d-flex flex-column gap-3">
                <label className="label-select-akun">Jabatan Akun : </label>
                <Form.Select onChange={handleChangeJabatan}>
                  {jenisAkun === "DISDIK" ? (
                    <>
                      <option value={"sekretaris"}>Sekretaris Disdik</option>
                      <option value={"kasubag"}>Kasubag DISDIK</option>
                      <option value={"staff"}>Staff DISDIK</option>
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BuatAkun;
