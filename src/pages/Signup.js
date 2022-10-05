import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";
import InputWithLabel from "../components/InputWithLabel/InputWithLabel";
import InputWithSelect from "../components/InputWithSelect/InputWithSelect";
import LoginHeader from "../components/LoginHeader/LoginHeader";
import iconJabatan from "../assets/jabatan-icon.png";

function Signup() {
  const listJabatan = ["Ketua Sub Bagian", "Sekretaris", "Staff"];
  const [form, setForm] = useState({
    email: "",
    password: "",
    nip: "",
    nama: "",
    no_telp: "",
    role: "",
  });
  const handleChange = (e) => {
    setForm(() => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(form);
  };

  const handleGetSelected = (data) => {
    setForm({ ...form, role: data });
    // console.log(form);
  };
  return (
    <div className="bg-signup">
      <div className="signup-page">
        <LoginHeader />
        <form>
          <InputWithLabel
            label={"email"}
            name={"email"}
            type={"email"}
            placeholder={"example@gmail.com"}
            onChange={handleChange}
            required={true}
          />
          <InputWithLabel
            label={"password"}
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            onChange={handleChange}
            required={true}
          />
          <InputWithLabel
            label={"NIP"}
            name={"nip"}
            type={"number"}
            placeholder={"Nomor Induk Pegawai"}
            onChange={handleChange}
            required={true}
          />
          <InputWithLabel
            label={"nama"}
            name={"nama"}
            type={"text"}
            placeholder={"Masukkan nama lengkap"}
            onChange={handleChange}
            required={true}
          />
          <InputWithLabel
            label={"No Telp"}
            name={"no_telp"}
            type={"text"}
            placeholder={"Masukkan nama lengkap"}
            onChange={handleChange}
            required={true}
          />
          <InputWithSelect
            label={"Jabatan"}
            icon={iconJabatan}
            options={listJabatan}
            changeSelected={handleGetSelected}
          />
          <div className={"btnSection"}>
            <ButtonLogin
              onClickHandle={handleClick}
              title={"Daftar"}
              type={"submit"}
            />
          </div>
        </form>
        <div className="login-page-no-account">
          <p>Sudah memiliki akun?</p>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
