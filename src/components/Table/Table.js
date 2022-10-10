import React from "react";
import Table from "react-bootstrap/Table";
import TableBody from "../TableBody/TableBody";
import TableHeader from "../TableHeader/TableHeader";
import { useSelector } from "react-redux";
function TableComponent() {
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
  return (
    <Table responsive striped bordered>
      <TableHeader dataRow={tableHeader} />
      <TableBody data={data} />
    </Table>
  );
}

export default TableComponent;
