import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardHomeLaporan.module.css";
function CardHomeLaporan(props) {
  return (
    <div
      className={`${styles.cardLaporan} card p-2 pt-4 d-flex flex-column justify-content-center align-items-center gap-2`}
    >
      <img src={props.img} alt="" />
      <h4>{props.size}</h4>
      <p className="text-center">{props.label}</p>
      <Link to={props.url}>Lihat</Link>
    </div>
  );
}

export default CardHomeLaporan;
