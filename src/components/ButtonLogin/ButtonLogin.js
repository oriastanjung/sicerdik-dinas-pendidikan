import React from "react";
import styles from "./ButtonLogin.module.css";

function ButtonLogin(props) {
  return (
    <input
      type={props.type}
      className={styles.btnLogin}
      onClick={props.onClickHandle}
      value={props.title}
    />
  );
}

export default ButtonLogin;
