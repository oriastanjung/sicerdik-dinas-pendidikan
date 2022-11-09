import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import iconSicerdik from "../assets/logo-sicerdik.png";
import ButtonLogin from "../components/ButtonLogin/ButtonLogin";
function PageBeforeLogin() {
  const navigation = useNavigate();
  const token = Cookies.get("token");

  const handleClick = () => {
    navigation("/login");
  };
  useEffect(() => {
    if (token) {
      navigation("/home");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="portal">
      <div className="container container-portal  d-flex flex-column justify-content-center align-items-center">
        <div className="card">
          <div>
            <img src={iconSicerdik} alt="" />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>SICERDIK</h1>
            <h2>Dinas Pendidikan</h2>
            <h3>Kota Tanjungpinang</h3>
            <div className={"btnSection"}>
              <ButtonLogin
                onClickHandle={handleClick}
                title={"Masuk"}
                type={"submit"}
              >
                Masuk
              </ButtonLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageBeforeLogin;
