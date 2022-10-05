import React, { useState } from "react";
import NavTitle from "../NavTitle/NavTitle";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const showHandleMenu = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };
  return (
    <nav className={styles.navbar}>
      <NavTitle />
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
              <Link to={"/login"}>Logout</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
