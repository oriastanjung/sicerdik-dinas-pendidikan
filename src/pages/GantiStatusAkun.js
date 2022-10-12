import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import FormCard from "../components/FormCard/FormCard";
import { useSelector, useDispatch } from "react-redux";

import NavBarManajemenAkun from "../components/NavBarManajemenAkun/NavBarManajemenAkun";
import ButtonFormView from "../components/ButtonFormView/ButtonFormView";
function GantiStatusAkun(props) {
  const navigation = useNavigate();
  const { id } = useParams();
  const { data } = useSelector((state) => state.dummyDataManajemenAkun);
  const targetData = data.find((item) => item.id == id);
  const [statusAkun, setStatusAkun] = useState(targetData.status_akun);
  const handleChange = (e) => {
    setStatusAkun(e.target.value);
  };
  return (
    <>
      <NavBarManajemenAkun />
      <main className="main pt-5 pb-5" style={{ height: "100vh" }}>
        <FormCard>
          <div className="mx-4 mt-3 mb-4 formCardHead">
            <h3 className="pb-3">
              Ganti Status - {targetData.email} | {targetData.nip} |{" "}
              {targetData.asal_sekolah}
            </h3>
          </div>
          <div className="mx-5 mt-3 mb-4">
            <form className="verifikasiPenandatangan">
              <h4 className="ms-3">Ganti Status Akun Menjadi :</h4>
              <Form.Select required onChange={handleChange}>
                <option value={"aktif"}>Aktif </option>
                <option value={"non aktif"}>Non Aktif </option>
              </Form.Select>
              <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
                <ButtonFormView isprimary onClick={() => alert("gantii")}>
                  Ganti Status
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

export default GantiStatusAkun;
