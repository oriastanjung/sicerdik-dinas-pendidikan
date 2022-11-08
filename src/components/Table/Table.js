import React from "react";
import Table from "react-bootstrap/Table";
import TableBody from "../TableBody/TableBody";
import TableHeader from "../TableHeader/TableHeader";
import { useSelector } from "react-redux";
function TableComponent(props) {
  const tableHeader = [
    "Tanggal Naskah",
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

  const dataButuhTTD = data.filter((item) => {
    return item.status_ttd == 'BELUM'
  }).map((item) => item);

  const dataPerluDikirim = data.filter((item) => {
    return item.status_kirim == 'BELUM'
  }).map((item) => item);


  const dataSelesai = data.filter((item) => {
    return item.status_kirim == 'SUDAH'
  }).map((item) => item);
  console.log(dataSelesai);
  return (
    <Table responsive striped bordered>
      <TableHeader dataRow={tableHeader} />
      {props.isTTD && <TableBody data={dataButuhTTD} />}
      {props.isNeedSend && <TableBody data={dataPerluDikirim} />}
      {props.isDone && <TableBody data={dataSelesai} />}
      {(!props.isTTD && !props.isNeedSend && !props.isDone )&& <TableBody data={data} />}
      {/* {props.} */}
      {/* <TableBody data={data} /> */}
    </Table>
  );
}

export default TableComponent;
