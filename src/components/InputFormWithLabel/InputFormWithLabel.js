import React from "react";
import styles from "./InputFormWithLabel.module.css";

function InputFormWithLabel(props) {
  return (
    <div className={styles.inputGroup}>
      <label> {props.label} : </label>
      <input
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.isRequired}
      />
    </div>
  );
}

export default InputFormWithLabel;
