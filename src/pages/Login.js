import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";
import InputWithLabel from "../components/InputWithLabel/InputWithLabel";
import LoginHeader from "../components/LoginHeader/LoginHeader";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm(() => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="bg">
      <div className="login-page">
        <LoginHeader />
        <form>
          <InputWithLabel
            label={"email"}
            type={"email"}
            placeholder={"example@gmail.com"}
            onChange={handleChange}
            required={true}
          />
          <InputWithLabel
            label={"password"}
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
          <p>Belum memiliki akun?</p>
          <Link to={"/signup"}>Daftar</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
