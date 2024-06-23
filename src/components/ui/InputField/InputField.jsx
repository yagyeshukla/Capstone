import React from "react";
import classes from "./InputField.module.scss";

const InputField = ({ type, placeholder, error, ...props }) => {
  return (
    <div className={classes.inputField}>
      <input type={type} placeholder={placeholder} {...props} />
      <div className={classes["control-error"]}>
        {error && <p className={classes["control-error-para"]}>{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
