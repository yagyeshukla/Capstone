import { AiOutlineExclamationCircle } from "react-icons/ai";
import classes from "./Activity.module.scss";

export default function Activity({ severity, description }) {
  return (
    <li className={classes.activity}>
      <AiOutlineExclamationCircle className={classes["activity-icon"]} />
      <p className={classes["activity-description"]}>{description}</p>
    </li>
  );
}
