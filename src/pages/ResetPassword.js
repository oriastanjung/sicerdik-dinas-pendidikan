import React, { useState } from "react";
import InputFormWithLabel from "../components/InputFormWithLabel/InputFormWithLabel";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import FormCard from "../components/FormCard/FormCard";
import { useSelector, useDispatch } from "react-redux";

import NavBarManajemenAkun from "../components/NavBarManajemenAkun/NavBarManajemenAkun";
import ButtonFormView from "../components/ButtonFormView/ButtonFormView";

function ResetPassword(props) {
  const navigation = useNavigate();
  const { id } = useParams();
  const { data } = useSelector((state) => state.dummyDataManajemenAkun);
  const targetData = data.find((item) => item.id == id);
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <NavBarManajemenAkun />
      <main className="main pt-5 pb-5" style={{ height: "100vh" }}>
        <FormCard>
          <div className="mx-4 mt-3 mb-4 formCardHead">
            <h3 className="pb-3">
              Reset Password Akun - {targetData.email} | {targetData.nip} |{" "}
              {targetData.asal_sekolah}
            </h3>
          </div>
          <div className="mx-5 mt-3 mb-4">
            <form className="verifikasiPenandatangan">
              <h3 className="text-center">Reset Password</h3>
              <InputFormWithLabel
                label={"Password Baru Anda "}
                type={"password"}
                name={"password"}
                onChange={handleChange}
                value={password}
                isRequired={true}
              />
              <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
                <ButtonFormView
                  isprimary
                  //   onClick={() => alert("gantii")}
                  type={"submit"}
                >
                  Reset Password
                </ButtonFormView>
                <ButtonFormView
                  isinfo
                  onClick={() => navigation("/manajemen-akun/users")}
                >
                  Batalkan
                </ButtonFormView>
              </div>
            </form>
          </div>
        </FormCard>
      </main>
      <Footer></Footer>
    </>
  );
}

export default ResetPassword;
