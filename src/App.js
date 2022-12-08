import "./App.css";
import { useState } from "react";
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
import WebViewerContext from "./context/webviewer";
import "bootstrap/dist/css/bootstrap.min.css";
import PageBeforeLogin from "./pages/PageBeforeLogin";
import LaporanPerluVerifikasi from "./pages/LaporanPerluVerifikasi";
import LaporanPerluRevisi from "./pages/LaporanPerluRevisi";
import BuatAkun from "./pages/BuatAkun";
import TampilanBorang from "./pages/TampilanBorang";

function App() {
  const [instance, setInstance] = useState();
  return (
    <>
      <WebViewerContext.Provider value={{ instance, setInstance }}>
        <Routes>
          <Route path="/" element={<PageBeforeLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tampilin" element={<TampilanBorang />} />
          <Route path="/reports" element={<SemuaLaporan />} />
          <Route path="/reports-ttd" element={<LaporanPerluTTD />} />
          <Route
            path="/reports-verifikasi"
            element={<LaporanPerluVerifikasi />}
          />
          <Route path="/reports-send" element={<LaporanPerluDikirim />} />
          <Route path="/reports-revisi" element={<LaporanPerluRevisi />} />
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
          <Route path="/manajemen-akun/buat-akun" element={<BuatAkun />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </WebViewerContext.Provider>
    </>
  );
}

export default App;
