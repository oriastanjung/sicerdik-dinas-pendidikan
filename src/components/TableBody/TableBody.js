import React from "react";
import { Link } from "react-router-dom";
import IconAksi from "../../assets/logo-aksi-table.png";
import moment from "moment/moment";
function TableBody(props) {
  return (
    <tbody>
      {props.data &&
        props.data.map((item, idx) => {
          console.log("data >> ", props.data);
          return (
            <tr key={idx} className="text-center align-middle">
              <td>{idx + 1}</td>
              <td>{item.nomor_laporan}</td>
              <td>
                {moment(item.tanggal_naskah_masuk).format("MMMM Do YYYY")}
              </td>
              <td>{item.nama_siswa}</td>
              <td>{item.nisn_siswa}</td>
              <td>{item.hal}</td>
              <td>{item.asal_sekolah}</td>
              <td>{item.tujuan_sekolah}</td>
              <td>
                {item.yang_menandatangani
                  ? item.yang_menandatangani
                  : "BELUM DITENTUKAN"}
              </td>
              <td>
                <span
                  className="button-status px-2 py-1"
                  style={{
                    backgroundColor: `${
                      item.status_verifikasi === false ? "#EDE300" : "#00BDAA"
                    }`,
                  }}
                >
                  {!item.status_verifikasi ? "BELUM" : "SUDAH"}
                </span>
              </td>
              <td>
                <span
                  className="button-status px-2 py-1"
                  style={{
                    backgroundColor: `${
                      item.status_ttd === false ? "#EDE300" : "#00BDAA"
                    }`,
                  }}
                >
                  {!item.status_ttd ? "BELUM" : "SUDAH"}
                </span>
              </td>
              <td>
                <span
                  className="button-status px-2 py-1"
                  style={{
                    backgroundColor: `${
                      item.status_kirim === false ? "#EDE300" : "#00BDAA"
                    }`,
                  }}
                >
                  {!item.status_kirim ? "BELUM" : "SUDAH"}
                </span>
              </td>

              <td>
                <Link to={`/detail/${item._id}`}>
                  <span className="action-btn">
                    <img src={IconAksi} alt="icon" />
                  </span>
                </Link>
              </td>
            </tr>
          );
        })}
    </tbody>
  );
}

export default TableBody;
