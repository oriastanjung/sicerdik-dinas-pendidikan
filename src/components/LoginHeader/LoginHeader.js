import React from "react";
import styles from "./LoginHeader.module.css";

function LoginHeader() {
  return (
    <div className={styles.loginHeader}>
      <h1>SICERDIK</h1>
      <h2>Dinas Pendidikan</h2>
      <p>Kota Tanjungpinang</p>
    </div>
  );
}

export default LoginHeader;
