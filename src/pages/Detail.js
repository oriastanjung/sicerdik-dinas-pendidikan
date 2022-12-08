import React, { useState, useEffect, useRef } from "react";
import { json, Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeStatusVerifikasi,
  changeStatusKirim,
  changeStatusTTD,
  resetError,
} from "../store/reducers/dummyDataSlice";
import WebViewer from "@pdftron/webviewer";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import FormCard from "../components/FormCard/FormCard";
import ViewSuratCard from "../components/ViewSuratCard/ViewSuratCard";
import Form from "react-bootstrap/Form";
import ButtonFormView from "../components/ButtonFormView/ButtonFormView";
import InputFormWithLabel from "../components/InputFormWithLabel/InputFormWithLabel";
import ViewStatusCard from "../components/ViewStatusCard/ViewStatusCard";
import ViewBorangCard from "../components/ViewBorangCard/ViewBorangCard";
import Swal from "sweetalert2";
import SideBar from "../components/SideBar/SideBar";
import { apiUploadPath, apiFile } from "../config";
import { authorizationCheck } from "../utils/authRole";

function Detail() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [penandaTangan, setPenandatangan] = useState();
  const [kembalikanSuratVerfikasi, setKembalikanSuratVerifikasi] =
    useState(false);
  const [kembalikanSuratTTD, setKembalikanSuratTTD] = useState(false);
  const [formTTE, setFormTTE] = useState({
    nip: "",
    keyphrase: "",
  });

  const dispatch = useDispatch();
  const { data: allData, errorMessage } = useSelector(
    (state) => state.dummyData
  );
  const { form } = useSelector((state) => state.login);
  const targetData = allData.find((item) => item._id == id);
  console.log("target data >> ", targetData);
  // const roleSementara = "Ketua Sub Bagian";
  const [roleSementara, setRoleSementara] = useState(authorizationCheck());

  const handleMarkAsVerified = (id) => {
    console.log("role >>> ", roleSementara);
    if (/*form.role*/ roleSementara === "staff") {
      Swal.fire({
        title: "Verifikasi Naskah?",
        showDenyButton: true,
        confirmButtonText: "Verifikasi",
        denyButtonText: `Batalkan`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(changeStatusVerifikasi(id));
          Swal.fire("Verified!", "", "success");
          navigation("/home");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda bukan orang yang melakukan Verifikasi Berkas",
      });
    }
  };

  const handleMarkAsSended = (id) => {
    if (/*form.role*/ roleSementara === "kasubag") {
      dispatch(changeStatusKirim(id));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda bukan orang yang melakukan Pengiriman Naskah",
      });
    }
  };

  const handleMarkAsTTD = (id) => {
    if (
      /*form.role*/ roleSementara === "Ketua Sub Bagian" ||
      /*form.role*/ roleSementara === "Sekretaris DISDIK"
    ) {
      if (formTTE.nip !== form.nip || formTTE.keyphrase !== form.keyphrase) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "NIP atau KEYPHRASE Salah",
        });
      } else if (
        formTTE.nip === form.nip &&
        formTTE.keyphrase === form.keyphrase
      ) {
        Swal.fire({
          title: "Yakin Untuk Menandatangi?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Tanda Tangan",
          denyButtonText: `Batal`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            dispatch(changeStatusTTD(id));
            Swal.fire("Berhasil di Tanda tangan!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Tidak ada perubahan", "", "info");
          }
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda bukan orang yang melakukan TTD",
      });
    }
  };

  const handleChangeFormTTE = (e) => {
    setFormTTE(() => {
      return { ...formTTE, [e.target.name]: e.target.value };
    });
  };

  const handleChange = (e) => {
    setPenandatangan(e.target.value);
    // props.changeSelected(e.target.value);
  };

  const handleKembalikanNaskahTTD = (e) => {
    if (/*form.role*/ roleSementara === "Ketua Sub Bagian") {
      Swal.fire({
        title: "Yakin ingin kembalikan naskah ?",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Iya, Naskah bermasalah",
        denyButtonText: `Batalkan`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Naskah Dikembalikan!", "", "success");
        }
        // else if (result.isDenied) {
        //   Swal.fire("Changes are not saved", "", "info");
        // }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda bukan orang yang melakukan TTD Berkas",
      });
    }
  };
  const handleKembalikanNaskahVerifikasi = (e) => {
    if (/*form.role*/ roleSementara === "Staff") {
      Swal.fire({
        title: "Yakin ingin kembalikan naskah ?",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Iya, Naskah bermasalah",
        denyButtonText: `Batalkan`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Naskah Dikembalikan!", "", "success");
        }
        // else if (result.isDenied) {
        //   Swal.fire("Changes are not saved", "", "info");
        // }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda bukan orang yang melakukan Verifikasi Berkas",
      });
    }
  };

  useEffect(() => {
    if (errorMessage) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(resetError());
        }
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (!targetData) {
      navigation("/home");
    }
  }, []);
  const jsonData = {
    nama_siswa: "ORIAS",
    asal_sekolah: "sman2",
    nomor_naskah: "27831",
  };

  return (
    <>
      <NavBar />
      {targetData ? (
        <div className="d-flex flex-row justify-content-center">
          <div
            className="pt-3"
            style={{ width: "17%", borderRight: "2px solid #A19F9F" }}
          >
            <SideBar />
          </div>
          <main className="main pt-5 pb-5 px-3" style={{ width: "83%" }}>
            <FormCard>
              <div className="mx-4 mt-3 mb-4 formCardHead">
                <h3 className="pb-3">Verifikasi Naskah id-{id}</h3>
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
                    <div className="ps-2">
                      <InputFormWithLabel
                        label={"Nomor Surat Naskah"}
                        type={"text"}
                      />
                      <InputFormWithLabel
                        label={"Tanggal Naskah Disposisi"}
                        type={"date"}
                      />
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
                    <div className="verifikasiPenandatangan">
                      <h4 className="ms-3">Pilih Penandatangan :</h4>
                      <Form.Select onChange={handleChange}>
                        <option value={"Kepala Sub Bagian"}>
                          Ketua Sub Bagian{" "}
                        </option>
                        <option value={"Sekretaris DISDIK"}>
                          Sekretaris DISDIK{" "}
                        </option>
                      </Form.Select>
                    </div>
                    {kembalikanSuratVerfikasi ? (
                      <div className="ps-2 mt-3">
                        <InputFormWithLabel label={"Komentar "} />
                        <div className="d-flex gap-2 mt-2">
                          <ButtonFormView
                            isinfo
                            onClick={() => setKembalikanSuratVerifikasi(false)}
                          >
                            Batalkan
                          </ButtonFormView>
                          <ButtonFormView
                            onClick={handleKembalikanNaskahVerifikasi}
                          >
                            Kembalikan Naskah
                          </ButtonFormView>
                        </div>
                      </div>
                    ) : (
                      <div className="formLaporanAction mt-3 ps-2">
                        <ButtonFormView
                          isinfo
                          onClick={() => setKembalikanSuratVerifikasi(true)}
                        >
                          Naskah Bermasalah
                        </ButtonFormView>
                        <p>*Kembalikan Naskah Jika ada yang tidak valid</p>
                      </div>
                    )}

                    <div className="formLaporanAction d-flex justify-content-end align-items-end flex-column my-4 gap-3 ">
                      <div>
                        <ButtonFormView
                          onClick={() => {
                            handleMarkAsVerified(id);
                          }}
                        >
                          Verifikasi
                        </ButtonFormView>
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
              {console.log(
                "surat ortu >> ,",
                `${apiFile}/${targetData.surat_ortu}`
              )}
              <Link
                to={{
                  pathname: `/tampilin`,
                  search: createSearchParams({
                    nama_siswa: targetData.nama_siswa,
                    asal_sekolah: targetData.asal_sekolah,
                    nomor_naskah: targetData.nomor_naskah,
                  }).toString(),
                }}
              >
                Tampilkan Borang
              </Link>
              {targetData.status_ttd === false ? (
                <>
                  <div className="mx-5 mt-3 mb-4"></div>
                  <div className="d-flex flex-row justify-content-between align-items-center mx-4 mt-3 mb-4 px-4 gap-5">
                    {/* <div className=" flex-grow-1">
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
                  </div> */}
                    <div>
                      <p>Upload Surat Rekomendasi</p>
                      <input type="file" />
                    </div>
                  </div>
                  {kembalikanSuratTTD ? (
                    <div className="ps-5 mt-3">
                      <InputFormWithLabel label={"Komentar "} />
                      <div className="d-flex gap-2 mt-2">
                        <ButtonFormView
                          isinfo
                          onClick={() => setKembalikanSuratTTD(false)}
                        >
                          Batalkan
                        </ButtonFormView>
                        <ButtonFormView onClick={handleKembalikanNaskahTTD}>
                          Kembalikan Naskah
                        </ButtonFormView>
                      </div>
                    </div>
                  ) : (
                    <div className="formLaporanAction mt-3 ps-5">
                      <ButtonFormView
                        isinfo
                        onClick={() => setKembalikanSuratTTD(true)}
                      >
                        Naskah Bermasalah
                      </ButtonFormView>
                      <p>*Kembalikan Naskah Jika ada yang tidak valid</p>
                    </div>
                  )}
                  <div className="mx-5 mt-3 mb-4">
                    <div className="formLaporanAction d-flex justify-content-end align-items-end flex-column my-4 gap-3 ">
                      <div>
                        <ButtonFormView
                          onClick={() => handleMarkAsTTD(id)}
                          isprimary={"true"}
                        >
                          Proses TTE
                        </ButtonFormView>
                      </div>
                      <p>
                        *Pastikan anda adalah orang yang harus menandatangani
                      </p>
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
                  status={targetData.status_verifikasi ? "SUDAH" : "BELUM"}
                />
                <ViewStatusCard
                  label={"Status Tanda Tangan Elektronik (TTE)"}
                  status={targetData.status_ttd ? "SUDAH" : "BELUM"}
                />

                {targetData.status_kirim === 0 ? (
                  <div className="formLaporanAction d-flex justify-content-end align-items-end flex-column my-4 gap-3 ">
                    <div>
                      <ButtonFormView onClick={() => handleMarkAsSended(id)}>
                        Kirim
                      </ButtonFormView>
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
        </div>
      ) : (
        navigation("/home")
      )}
      <Footer />
    </>
  );
}

export default Detail;
