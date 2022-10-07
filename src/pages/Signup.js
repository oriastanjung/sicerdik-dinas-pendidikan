import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";
import InputWithLabel from "../components/InputWithLabel/InputWithLabel";
import InputWithSelect from "../components/InputWithSelect/InputWithSelect";
import LoginHeader from "../components/LoginHeader/LoginHeader";
import iconJabatan from "../assets/jabatan-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { makeAccount, clearAllState } from "../store/reducers/signupSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SwalLoading } from "../components/SwalLoading/SwalLoading";

function Signup() {
  const listJabatan = ["Ketua Sub Bagian", "Sekretaris", "Staff"];
  const [form, setForm] = useState({
    email: "",
    password: "",
    nip: "",
    nama: "",
    no_telp: "",
    role: listJabatan[0],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLoading,
    isSuccess,
    errorMessage,
    form: formState,
  } = useSelector((state) => state.signup);

  const handleChange = (e) => {
    setForm(() => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      form.email &&
      form.password &&
      form.nip &&
      form.nama &&
      form.no_telp &&
      form.role
    ) {
      dispatch(makeAccount(form));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi Semua Form",
      });
    }
  };

  const handleGetSelected = (data) => {
    setForm({ ...form, role: data });
  };

  useEffect(() => {
    if (isLoading) {
      if (
        form.email &&
        form.password &&
        form.nip &&
        form.nama &&
        form.no_telp &&
        form.role
      ) {
        SwalLoading(`Sedang Membuat Akun dengan email : ${form.email}`);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (errorMessage) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Berhasil membuat akun ${formState.data.email}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(clearAllState());
        navigate("/login");
        alert(
          "Maaf ini dalam development mode akun yang bisa login hanya email : admin@gmail.com dengan password : 123"
        );
      }, 2000);
    }
  }, [isSuccess]);

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
