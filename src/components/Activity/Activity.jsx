import { useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GoAlertFill } from "react-icons/go";
import classes from "./Activity.module.scss";

export default function Activity({ severity, alert }) {
  const [isNew, setIsNew] = useState(true);

  const date = new Date(alert.timestamp);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNew(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <li
      className={`${classes.activity} ${classes[`${severity}`]} ${
        isNew ? `${classes.newAlert} ${classes.initial}` : classes.slideIn
      }`}
    >
      <GoAlertFill className={classes["activity-icon"]} />
      <div className={classes["activity-description"]}>
        <p className={classes.activity_heading}>{alert.event_type}</p>
        <div className={classes.activity_info}>
          <p>{time}</p>
          <p>{alert.violation_type}</p>
        </div>
      </div>
    </li>
  );
}
