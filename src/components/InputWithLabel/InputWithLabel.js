import React from "react";
import styles from "./InputWithLabel.module.css";

function InputWithLabel(props) {
  return (
    <div className={styles.inputGroup}>
      <label> {props.label} :</label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required}
      />
    </div>
  );
}

export default InputWithLabel;
