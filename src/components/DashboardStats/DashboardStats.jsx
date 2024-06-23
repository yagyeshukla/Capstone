import { useState, useContext, useEffect } from "react";

import StatCard from "../StatCard/StatCard";

import { WebSocketContext } from "../../store/WebSocketContext";

import classes from "./DashboardStats.module.scss";

import { FiBarChart } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";
import { ImStatsBars2 } from "react-icons/im";
import { FiTrendingUp } from "react-icons/fi";

export default function DashboardStats() {
  const [cardValues, setCardValues] = useState({
    total_violation: 0,
    safety_score: 0,
    safety_conditions: "",
  });
  // const ws = useContext(WebSocketContext);
  const json = useContext(WebSocketContext);

  // useEffect(() => {
  //   if (ws) {
  //     ws.onmessage = function (event) {
  //       setScore((prevScore) => prevScore + 1);
  //     };
  //   }
  // }, [ws]);

  useEffect(() => {
    if (json) {
      const { total_violation, safety_score, safety_conditions } = json.json;
      setCardValues({
        total_violation: total_violation,
        safety_score: safety_score,
        safety_conditions: safety_conditions,
      });
    }
  }, [json]);

  return (
    <ul className={classes.stats}>
      <StatCard
        label="Total Violations"
        score={cardValues.total_violation}
        Icon={FiBarChart}
      />
      <StatCard
        label="Safety Score"
        score={cardValues.safety_score}
        Icon={FiActivity}
      />
      <StatCard
        label="Safety Conditions"
        score={cardValues.safety_conditions}
        Icon={ImStatsBars2}
      />
      {/* <StatCard label="Incident frequency" score={56} Icon={FiTrendingUp} /> */}
    </ul>
  );
}
