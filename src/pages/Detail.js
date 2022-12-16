import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeStatusVerifikasi,
  changeStatusKirim,
  changeStatusTTD,
  resetError,
  updateNaskahVerifikasi,
  sendFileDisdik,
} from "../store/reducers/dummyDataSlice";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import FormCard from "../components/FormCard/FormCard";
import ViewSuratCard from "../components/ViewSuratCard/ViewSuratCard";
import Form from "react-bootstrap/Form";
import ButtonFormView from "../components/ButtonFormView/ButtonFormView";
import InputFormWithLabel from "../components/InputFormWithLabel/InputFormWithLabel";
import ViewStatusCard from "../components/ViewStatusCard/ViewStatusCard";
import Swal from "sweetalert2";
import SideBar from "../components/SideBar/SideBar";
import { authorizationCheck } from "../utils/authRole";

function Detail() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [penandaTangan, setPenandatangan] = useState("kasubag");
  const [jenisSurat, setJenisSurat] = useState("Surat Pindah Sekolah");
  const [kembalikanSuratVerfikasi, setKembalikanSuratVerifikasi] =
    useState(false);
  const [kembalikanSuratTTD, setKembalikanSuratTTD] = useState(false);
  const [formTTE, setFormTTE] = useState({
    nip: "",
    keyphrase: "",
  });
  const [fileDisdik, setFileDisdik] = useState("");
  const [nomorNaskah, setNomorNaskah] = useState("");
  const [tanggalDisposisi, setTanggalDisposisi] = useState(new Date());
  const dispatch = useDispatch();
  const { data: allData, errorMessage } = useSelector(
    (state) => state.dummyData
  );
  // const { form } = useSelector((state) => state.login);
  const targetData = allData.find((item) => item._id == id);
  console.log("target data >> ", targetData);
  // const roleSementara = "Ketua Sub Bagian";
  const [roleSementara, setRoleSementara] = useState(authorizationCheck());
  const onChangeNomorNaskah = (e) => {
    setNomorNaskah(e.target.value);
    console.log("nomor naskah >> ", nomorNaskah);
  };
  const onChangeTanggalDisposisi = (e) => {
    setTanggalDisposisi(e.target.value);
    console.log("tanggal_disposisi", tanggalDisposisi);
  };
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
          if (nomorNaskah && tanggalDisposisi) {
            dispatch(changeStatusVerifikasi(id));
            // console.log("no >> ", nomorNaskah);
            // console.log("tanggal Disposisi >> ", tanggalDisposisi);
            // console.log("jenis >> ", jenisSurat);
            // console.log("penandatangan >> ", penandaTangan);
            const payload = {
              id: id,
              nomor_naskah: nomorNaskah,
              tanggal_naskah_disposisi: tanggalDisposisi,
              jenis_surat: jenisSurat,
              yang_menandatangani: penandaTangan,
            };
            dispatch(updateNaskahVerifikasi(payload));
            Swal.fire("Verified!", "", "success");
            navigation("/home");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Cek nomor naskah dan tanggal disposisi (harus diisi)",
            });
          }
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

  const handleMarkAsTTD = (id) => {
    console.log("role >>> ", roleSementara);
    console.log("file >> ", fileDisdik);
    if (
      /*form.role*/ roleSementara === "kasubag" ||
      /*form.role*/ roleSementara === "sekretaris"
    ) {
      if (targetData.yang_menandatangani === roleSementara) {
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
            navigation("/home");
          } else if (result.isDenied) {
            Swal.fire("Tidak ada perubahan", "", "info");
          }
        });
        // if (formTTE.nip !== form.nip || formTTE.keyphrase !== form.keyphrase) {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Oops...",
        //     text: "NIP atau KEYPHRASE Salah",
        //   });
        // } else if (
        //   formTTE.nip === form.nip &&
        //   formTTE.keyphrase === form.keyphrase
        // ) {
        //   Swal.fire({
        //     title: "Yakin Untuk Menandatangi?",
        //     showDenyButton: true,
        //     showCancelButton: true,
        //     confirmButtonText: "Tanda Tangan",
        //     denyButtonText: `Batal`,
        //   }).then((result) => {
        //     /* Read more about isConfirmed, isDenied below */
        //     if (result.isConfirmed) {
        //       dispatch(changeStatusTTD(id));
        //       Swal.fire("Berhasil di Tanda tangan!", "", "success");
        //     } else if (result.isDenied) {
        //       Swal.fire("Tidak ada perubahan", "", "info");
        //     }
        //   });
        // }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda bukanlah orang yang dipilih melakukan TTD",
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

  const handleMarkAsSended = (id) => {
    if (
      /*form.role*/ roleSementara === "kasubag" ||
      roleSementara === "sekretaris"
    ) {
      if (fileDisdik) {
        if (targetData.status_ttd === true) {
          Swal.fire({
            title: "Kirim Naskah?",
            showDenyButton: true,
            confirmButtonText: "Kirim",
            denyButtonText: `Batalkan`,
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(sendFileDisdik({ id: id, data: fileDisdik }));
              dispatch(changeStatusKirim(id));
              Swal.fire("Terkirim!", "", "success");
              navigation("/home");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Naskah belum di tandatangani",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "File Rekomendasi Belum Di Upload",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda bukan orang yang melakukan Pengiriman Naskah",
      });
    }
  };

  const handleChange = (e) => {
    setPenandatangan(e.target.value);
    // props.changeSelected(e.target.value);
  };
  const handleChangeJenisSurat = (e) => {
    setJenisSurat(e.target.value);
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

  const handleChangeFileDisdik = (e) => {
    setFileDisdik(e.target.files[0]);
    console.log("file >> ", fileDisdik);
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
  // const jsonData = {
  //   nama_siswa: "ORIAS",
  //   asal_sekolah: "sman2",
  //   nomor_naskah: "27831",
  // };

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
                {targetData.status_verifikasi === false ? (
                  <>
                    <div className="ps-2">
                      <InputFormWithLabel
                        label={"Nomor Surat Naskah"}
                        value={nomorNaskah}
                        onChange={onChangeNomorNaskah}
                        type={"text"}
                      />
                      <InputFormWithLabel
                        label={"Tanggal Naskah Disposisi"}
                        type={"date"}
                        value={tanggalDisposisi}
                        onChange={onChangeTanggalDisposisi}
                      />
                    </div>
                    <div className="verifikasiPenandatangan">
                      <h4 className="ms-3">Jenis Surat yang akan Dikirim :</h4>
                      <Form.Select onChange={handleChangeJenisSurat}>
                        <option value={"REKOMENDASI_PINDAH_SEKOLAH_KELUAR"}>
                          Surat Pindah Sekolah Keluar{" "}
                        </option>
                        <option value={"REKOMENDASI_PINDAH_SEKOLAH_MASUK"}>
                          Surat Pindah Sekolah Masuk{" "}
                        </option>
                        <option value={"REKOMENDASI_PINDAH_RAYON_KELUAR"}>
                          Surat Pindah Rayon Keluar{" "}
                        </option>
                        <option value={"REKOMENDASI_PINDAH_RAYON_MASUK"}>
                          Surat Pindah Rayon Masuk{" "}
                        </option>
                      </Form.Select>
                    </div>
                    <div className="verifikasiPenandatangan">
                      <h4 className="ms-3">Pilih Penandatangan :</h4>
                      <Form.Select onChange={handleChange}>
                        <option value={"kasubag"}>Ketua Sub Bagian </option>
                        <option value={"sekretaris"}>Sekretaris DISDIK </option>
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
              {/* {console.log(
                "surat ortu >> ,",
                `${apiFile}/${targetData.surat_ortu}`
              )} */}
              <div className="mx-5 card p-2 borangBtn">
                {targetData && console.log("target data >> ", targetData)}
                <Link
                  to={{
                    pathname: `/tampilin`,
                    search: createSearchParams({
                      jenis_surat: targetData.jenis_surat,
                      nomor_laporan: targetData.nomor_laporan,
                      nama_siswa: targetData.nama_siswa,
                      asal_sekolah: targetData.asal_sekolah,
                      tujuan_sekolah: targetData.tujuan_sekolah,
                      nomor_naskah: targetData.nomor_naskah,
                      tanggal_naskah_masuk: targetData.tanggal_naskah_masuk,
                      tanggal_disposisi: targetData.tanggal_naskah_disposisi,
                      nisn_siswa: targetData.nisn_siswa,
                      nis_siswa: targetData.nis,
                      kelas: targetData.kelas,
                      nama_ortu: targetData.nama_orang_tua,
                      jenis_kelamin: targetData.jenis_kelamin,
                      yang_menandatangani: targetData.yang_menandatangani,
                      nip: "20192991",
                      tempat_tanggal_lahir: targetData.tempat_tgl_lahir,
                      pekerjaan_ortu: targetData.pekerjaan_orang_tua,
                      alasan_pindah: targetData.alasan_pindah,
                      jabatan: roleSementara,
                      tahun_lulus: `${
                        targetData.tahun_lulus ? targetData.tahun_lulus : "2022"
                      }`,
                    }).toString(),
                  }}
                >
                  Tampilkan Borang
                </Link>
              </div>
              {targetData.surat_disdik && (
                <div className="mx-5 mt-3 mb-4">
                  <ViewSuratCard
                    label={"Surat Rekomendasi DISDIK"}
                    pdfFile={targetData.surat_disdik}
                  />
                </div>
              )}
              {targetData.status_ttd === false ||
              targetData.status_kirim === false ? (
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

                    {!targetData.status_kirim && (
                      <div>
                        <p>Upload Surat Rekomendasi</p>
                        <input
                          type="file"
                          name={"filedisdik"}
                          // value={fileDisdik}
                          onChange={handleChangeFileDisdik}
                        />
                      </div>
                    )}
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
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      {targetData.status_ttd === false ? (
                        <div className="formLaporanAction d-flex justify-content-end align-items-center flex-column my-4 gap-3 ">
                          <div>
                            <ButtonFormView
                              onClick={() => handleMarkAsTTD(id)}
                              isprimary={"true"}
                            >
                              {/* Proses TTE */}
                              Tandai telah di Tandatangani
                            </ButtonFormView>
                          </div>
                          <p>
                            *Pastikan anda adalah orang yang harus
                            menandatangani
                          </p>
                        </div>
                      ) : (
                        <p className="text-center">Sudah Di TTD </p>
                      )}
                      {targetData.status_kirim === false ? (
                        <div className="formLaporanAction d-flex justify-content-end align-items-center flex-column my-4 gap-3 ">
                          <div>
                            <ButtonFormView
                              isinfo
                              onClick={() => handleMarkAsSended(id)}
                            >
                              Kirim
                            </ButtonFormView>
                          </div>
                          <p>
                            *Pengiriman surat dilakukan oleh Kasubag atau
                            Sekretaris DISDIK
                          </p>
                        </div>
                      ) : (
                        <p className="d-flex justify-content-center align-items-center text-status-form mt-5 mb-0">
                          SUDAH DIKIRIM
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p className="d-flex justify-content-center align-items-center text-status-form mt-5 mb-0">
                  SUDAH DI TANDATANGANI DAN DI KIRIM
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
                  label={"Status Tanda Tangan (TTD)"}
                  status={targetData.status_ttd ? "SUDAH" : "BELUM"}
                />
                <ViewStatusCard
                  label={"Status Kirim"}
                  status={targetData.status_kirim ? "SUDAH" : "BELUM"}
                />
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
