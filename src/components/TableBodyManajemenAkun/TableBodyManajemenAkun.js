import React from "react";
import { Link } from "react-router-dom";
import IconAksi from "../../assets/logo-aksi-table.png";
import IconReset from "../../assets/logo-aksi-reset.png";
function TableBodyManajemenAkun(props) {
  return (
    <tbody>
      {props.data &&
        props.data.map((item, idx) => {
          return (
            <tr key={idx} className="text-center align-middle">
              <td>{idx + 1}</td>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.nip}</td>
              <td>{item.asal_sekolah}</td>
              <td>
                <span
                  className="button-status px-2 py-1"
                  style={{
                    backgroundColor: `${
                      item.status_akun === "non aktif" ? "#EDE300" : "#00BDAA"
                    }`,
                  }}
                >
                  {item.status_akun}
                </span>
              </td>
              <td>
                <div className=" d-flex justify-content-center align-items-center">
                  <Link to={`/manajemen-akun/users/ganti-status/${item.id}`}>
                    <span className="action-btn ">
                      <img src={IconAksi} alt="icon" />
                    </span>
                  </Link>
                </div>
              </td>
              <td>
                <div className=" d-flex justify-content-center align-items-center">
                  <Link to={`/manajemen-akun/users/reset-password/${item.id}`}>
                    <span className="action-btn ">
                      <img src={IconReset} alt="icon" />
                    </span>
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
    </tbody>
  );
}

export default TableBodyManajemenAkun;
