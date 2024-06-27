import React from "react";
import classes from "./SelectUseCase.module.scss";
import CardButton from "./CardButton/CardButton";

const SelectUseCase = () => {
  const handlePpeClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8082/video/start",
        new URLSearchParams({
          source: "src/main/resources/helmet.mp4",
          type: "rtmp",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleForkliftClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8082/video/start",
        new URLSearchParams({
          source: "src/main/resources/forklift_final.mp4",
          type: "rtmp",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className={`${classes.container} ${classes.blurBackground}`}>
      {/* <h1>Select Use Case</h1> */}
      <div className={classes.cardContainer}>
        <CardButton
          text="Personal Protective Equipment (PPE) Usage"
          to="/dashboard-ppe"
          handleClick={handlePpeClick}
        />
        <CardButton
          text="Forklift Management"
          to="/dashboard-forklift"
          handleClick={handleForkliftClick}
        />
      </div>
    </div>
  );
};

export default SelectUseCase;
