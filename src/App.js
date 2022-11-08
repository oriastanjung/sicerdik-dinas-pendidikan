import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GantiStatusAkun from "./pages/GantiStatusAkun";
import ResetPassword from "./pages/ResetPassword";
import Detail from "./pages/Detail";
import Users from "./pages/Users";
import ManajemenAkunLogin from "./pages/ManajemenAkunLogin";
import SemuaLaporan from "./pages/SemuaLaporan";
import LaporanPerluDikirim from "./pages/LaporanPerluDikirim";
import LaporanSelesai from "./pages/LaporanSelesai";
import LaporanPerluTTD from "./pages/LaporanPerluTTD";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<SemuaLaporan />} />
        <Route path="/reports-ttd" element={<LaporanPerluTTD />} />
        <Route path="/reports-send" element={<LaporanPerluDikirim />} />
        <Route path="/reports-done" element={<LaporanSelesai />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manajemen-akun" element={<ManajemenAkunLogin />} />
        <Route path="/manajemen-akun/users" element={<Users />} />
        <Route
          path="/manajemen-akun/users/ganti-status/:id"
          element={<GantiStatusAkun />}
        />
        <Route
          path="/manajemen-akun/users/reset-password/:id"
          element={<ResetPassword />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
