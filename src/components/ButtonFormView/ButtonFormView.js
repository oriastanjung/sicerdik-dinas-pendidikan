import React from "react";
import styles from "./ButtonFormView.module.css";

function ButtonFormView(props) {
  return (
    <button
      className={`${styles.button} ${
        props.isprimary ? styles["btn-primary"] : ""
      } ${props.isinfo ? styles["btn-info"] : ""}`}
      {...props}
      //   style={{ backgroundColor: `${props.isPrimary ? "#9772FB" : ""}` }}
    >
      {props.children}
    </button>
  );
}

export default ButtonFormView;
