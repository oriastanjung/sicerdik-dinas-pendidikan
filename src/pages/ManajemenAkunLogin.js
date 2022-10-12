import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";
import InputWithLabel from "../components/InputWithLabel/InputWithLabel";
import LoginHeader from "../components/LoginHeader/LoginHeader";
import { useDispatch, useSelector } from "react-redux";
import { fakeLogin } from "../store/reducers/loginSlice";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { SwalLoading } from "../components/SwalLoading/SwalLoading";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigate();

  const dispatch = useDispatch();
  const {
    isLoading,
    errorMessage,
    isSuccess,
    form: formState,
  } = useSelector((state) => state.login);

  const handleChange = (e) => {
    setForm(() => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (form.email || form.password) {
      dispatch(fakeLogin(form));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mohon isi semua form",
      });
    }
    console.log(formState);
  };

  useEffect(() => {
    isSuccess && navigation("/manajemen-akun/users");
  }, [isSuccess]);

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
    if (isLoading) {
      SwalLoading("Sedang Login");
    }
  }, [isLoading]);

  return (
    <div className="bg-signup">
      <div className="login-page">
        <LoginHeader />
        <h1 className="text-center text-white">Manajemen Akun Sekolah</h1>
        <form>
          <InputWithLabel
            label={"email admin"}
            name={"email"}
            type={"email"}
            placeholder={"example@gmail.com"}
            onChange={handleChange}
            required={true}
          />
          <InputWithLabel
            label={"password admin"}
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            onChange={handleChange}
            required={true}
          />
          <div className={"btnSection"}>
            <ButtonLogin
              onClickHandle={handleClick}
              title={"Login"}
              type={"submit"}
            >
              Login
            </ButtonLogin>
          </div>
        </form>
        <div className="login-page-no-account">
          <p>Kembali Ke Halaman Utama</p>
          <Link to={"/"}>SICERDIK</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
