import React from "react";
import styles from "./ViewStatusCard.module.css";

function ViewStatusCard(props) {
  return (
    <div className={`${styles.card} mb-2`}>
      <div className={styles.label}>
        <p>{props.label}</p>
      </div>
      <div
        className={styles.status}
        style={{
          backgroundColor: `${
            props.status === "belum" ||
            props.status === "BELUM" ||
            props.status === false ||
            props.status === 0
              ? "#ede300"
              : "#00BDAA"
          }`,
        }}
      >
        <p>{props.status}</p>
      </div>
    </div>
  );
}

export default ViewStatusCard;
