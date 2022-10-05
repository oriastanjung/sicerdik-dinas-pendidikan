import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "./InputWithSelect.module.css";

function InputWithSelect(props) {
  const [selected, setSelected] = useState();
  const handleChange = (e) => {
    setSelected(e.target.value);
    props.changeSelected(e.target.value);
  };
  return (
    <div className={styles.inputGroup}>
      <label>{props.label} : </label>
      <div className={styles.selectGroup}>
        <div className={styles.icon}>
          <img src={props.icon} />
        </div>
        <Form.Select onChange={handleChange}>
          {props.options &&
            props.options.map((item, id) => {
              return (
                <option key={id} value={item}>
                  {" "}
                  {item}
                </option>
              );
            })}
        </Form.Select>
      </div>
    </div>
  );
}

export default InputWithSelect;
