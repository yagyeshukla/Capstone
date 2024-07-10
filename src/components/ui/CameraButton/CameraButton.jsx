import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./CameraButton.module.scss";

const CameraButton = ({ Icon, children, onClick, to }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
        navigate(to);
      }}
      className={
        location.pathname === to
          ? `${classes.cameraButton} ${classes.active}`
          : classes.cameraButton
      }
    >
      <Icon className={classes.cameraIcon} />
      {children}
    </button>
  );
};

export default CameraButton;
