import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { WebSocketContext } from "../../store/WebSocketContext";
import Activity from "../Activity/Activity";

import classes from "./Activities.module.scss";

export default function Activities() {
  const [alerts, setAlerts] = useState([]);
  // const ws = useContext(WebSocketContext);
  const json = useContext(WebSocketContext);
  // useEffect(() => {
  //   if (ws) {
  //     ws.onmessage = function (event) {
  //       const json = JSON.parse(event.data).json;
  //       // console.log(json);
  //       if (json.category === "Alert") {
  //         setAlerts((prevAlerts) => [...prevAlerts, json]);
  //       }
  //     };
  //   }
  // }, [ws]);

  useEffect(() => {
    if (json) {
      const { json: cardJson } = json;
      // console.log(frame_url);
      if (cardJson.category === "Alert") {
        setAlerts((prevAlerts) => [...prevAlerts, cardJson]);
      }
    }
  }, [json]);

  return (
    <div className={classes["activities-container"]}>
      <h3 className={classes["activities-heading"]}>Activities</h3>
      <div className={classes["activities-box"]}>
        <ul className={classes["activities"]}>
          {alerts.map((alert, index) => {
            return (
              <NavLink
                to={`/Alert/${alert.frame}`}
                end
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                key={index}
                target="_blank"
              >
                <Activity description={alert.description.line1} />
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
