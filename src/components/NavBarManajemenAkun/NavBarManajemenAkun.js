import React, { useState } from "react";
import NavTitle from "../NavTitle/NavTitle";
import styles from "./NavBarManajemenAkun.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/loginSlice";
import Cookies from "js-cookie";

function NavBarManajemenAkun() {
  const [showMenu, setShowMenu] = useState(false);
  const showHandleMenu = () => {
    setShowMenu(!showMenu);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
  };
  return (
    <header>
      <nav className={styles.navbar}>
        <div
          className={styles.navLogo}
          onClick={() => navigate("/manajemen-akun/users")}
        >
          <NavTitle />
        </div>

        <div
          className={styles.title}
          onClick={() => navigate("/manajemen-akun/users")}
        >
          <h1 className="text-center">Manajemen Akun SICERDIK</h1>
        </div>
        <div className={styles.user}>
          <p>Admin</p>
          <div onClick={showHandleMenu}>
            <img
              className={styles.userLogo}
              src="https://img.icons8.com/officel/160/circled-user-male-skin-type-6.png"
              alt=""
            />
            <div
              className={styles.menu}
              style={{ display: `${showMenu ? "block" : "none"}` }}
            >
              <div>
                <img src="https://img.icons8.com/ios/100/exit.png" alt="" />
                <Link onClick={handleLogout} to={"/manajemen-akun"}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBarManajemenAkun;
