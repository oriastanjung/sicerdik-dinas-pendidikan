import React from "react";
import styles from "./FormCard.module.css";

function FormCard(props) {
  return (
    <div className={`${styles.card} container pt-5 pb-5 mb-5`}>
      {props.children}
    </div>
  );
}

export default FormCard;
