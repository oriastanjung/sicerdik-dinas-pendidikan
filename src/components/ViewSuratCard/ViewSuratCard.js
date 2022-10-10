import React from "react";
import styles from "./ViewSuratCard.module.css";
import iconEye from "../../assets/icon-eye.png";

function ViewSuratCard(props) {
  return (
    <div className={`${styles.card} mb-2`}>
      <div className={styles.label}>
        <p>{props.label}</p>
      </div>
      <div className={styles.icon}>
        <img src={iconEye} alt="" />
      </div>
    </div>
  );
}

export default ViewSuratCard;
