import React, { useState } from "react";
import NavTitle from "../NavTitle/NavTitle";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/loginSlice";
import Cookies from "js-cookie";

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const showHandleMenu = () => {
    setShowMenu(!showMenu);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
  };
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>
          <NavTitle />
        </div>
        <div className={styles.title}>
          <h1>SICERDIK</h1>
        </div>
        <div className={styles.user}>
          <p>Ketua Sub Bagian</p>
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
                <Link onClick={handleLogout} to={"/login"}>
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

export default NavBar;
