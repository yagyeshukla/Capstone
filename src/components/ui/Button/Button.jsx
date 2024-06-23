import React from "react";
import classes from "./Button.module.scss";
const Button = ({ icon, children, handleClick }) => {
  return (
    <button className={classes.btn} onClick={handleClick}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
