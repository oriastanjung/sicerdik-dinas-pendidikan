import React from "react";
import Table from "react-bootstrap/Table";
import TableBody from "../TableBody/TableBody";
import TableHeader from "../TableHeader/TableHeader";
import { useSelector } from "react-redux";
function TableComponent(props) {
  const tableHeader = [
    "Nomor Naskah",
    "Tanggal Naskah Masuk",
    "Nama Siswa",
    "Nisn",
    "Hal",
    "Asal Sekolah",
    "Tujuan Sekolah",
    "Yang Menandatangani",
    "Status Verifikasi",
    "Status Tanda Tangan",
    "Status Kirim",
    "Aksi",
  ];
  const { data } = useSelector((state) => state.dummyData);

  const dataButuhTTD = data
    .filter((item) => {
      return item.status_ttd === false;
    })
    .map((item) => item);

  const dataPerluDikirim = data
    .filter((item) => {
      return item.status_kirim === false;
    })
    .map((item) => item);

  const dataSelesai = data
    .filter((item) => {
      return item.status_kirim === true;
    })
    .map((item) => item);
  const dataVerifikasi = data
    .filter((item) => {
      return item.status_verifikasi === false;
    })
    .map((item) => item);
  // console.log(dataSelesai);
  return (
    <Table responsive striped bordered>
      <TableHeader dataRow={tableHeader} />
      {props.isTTD && <TableBody data={dataButuhTTD} />}
      {props.isVerifikasi && <TableBody data={dataVerifikasi} />}
      {props.isNeedSend && <TableBody data={dataPerluDikirim} />}
      {props.isDone && <TableBody data={dataSelesai} />}
      {!props.isTTD && !props.isNeedSend && !props.isDone && !props.isVerifikasi && (
        <TableBody data={data} />
      )}
      {/* {props.} */}
      {/* <TableBody data={data} /> */}
    </Table>
  );
}

export default TableComponent;
