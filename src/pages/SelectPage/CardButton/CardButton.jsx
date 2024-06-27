import React from "react";
import classes from "./CardButton.module.scss";

import { Link } from "react-router-dom";

import { Card } from "antd";

const CardButton = ({ text, to, handleClick }) => {
  return (
    <div className={`${classes.cardContainer} `}>
      <Link to={to} onClick={handleClick}>
        <Card
          hoverable
          className={classes.card}
          style={{
            height: "15rem",
            width: 270,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ededeb",
            cursor: "pointer",
          }}
        >
          <p className={classes.cardText}>{text}</p>
        </Card>
      </Link>
    </div>
  );
};

export default CardButton;
