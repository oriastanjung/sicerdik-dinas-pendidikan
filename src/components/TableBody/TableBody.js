import React from "react";
import { Link } from "react-router-dom";
import IconAksi from "../../assets/logo-aksi-table.png";
function TableBody(props) {
  return (
    <tbody>
      {props.data &&
        props.data.map((item, idx) => {
          return (
            <tr key={idx} className="text-center align-middle">
              <td>{idx + 1}</td>
              <td>{item.tgl_naskah}</td>
              <td>{item.hal}</td>
              <td>{item.asal_sekolah}</td>
              <td>{item.tujuan_sekolah}</td>
              <td>{item.yang_menandatangani}</td>
              <td>
                <span
                  className="button-status px-2 py-1"
                  style={{
                    backgroundColor: `${
                      item.status_verifikasi === "BELUM" ? "#EDE300" : "#00BDAA"
                    }`,
                  }}
                >
                  {item.status_verifikasi}
                </span>
              </td>
              <td>
                <span
                  className="button-status px-2 py-1"
                  style={{
                    backgroundColor: `${
                      item.status_ttd === "BELUM" ? "#EDE300" : "#00BDAA"
                    }`,
                  }}
                >
                  {item.status_ttd}
                </span>
              </td>
              <td>
                <span
                  className="button-status px-2 py-1"
                  style={{
                    backgroundColor: `${
                      item.status_kirim === "BELUM" ? "#EDE300" : "#00BDAA"
                    }`,
                  }}
                >
                  {item.status_kirim}
                </span>
              </td>

              <td>
                <Link to={`/detail/${item.id}`}>
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
