import React from "react";
import Table from "react-bootstrap/Table";
import TableBodyManajemenAkun from "../TableBodyManajemenAkun/TableBodyManajemenAkun";
import TableHeader from "../TableHeader/TableHeader";
import { useSelector } from "react-redux";
function TableUsers() {
  const tableHeader = [
    "ID_USER",
    "Email",
    "NIP",
    "Asal Sekolah",
    "Status Akun",
    "Ganti Status Akun",
    "Reset Password",
  ];
  const { data } = useSelector((state) => state.dummyDataManajemenAkun);
  return (
    <Table responsive striped bordered>
      <TableHeader dataRow={tableHeader} />
      <TableBodyManajemenAkun data={data} />
    </Table>
  );
}

export default TableUsers;
