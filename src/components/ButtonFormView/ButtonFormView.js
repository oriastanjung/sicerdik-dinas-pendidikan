import React from "react";
import styles from "./ButtonFormView.module.css";

function ButtonFormView(props) {
  return (
    <button
      className={`${styles.button}`}
      {...props}
      style={{ backgroundColor: `${props.isPrimary ? "#9772FB" : ""}` }}
    >
      {props.children}
    </button>
  );
}

export default ButtonFormView;
