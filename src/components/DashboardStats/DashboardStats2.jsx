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
    minimum_distance: 0,
    average_distance: 0,
    proximity_score: "",
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
      const { minimum_distance, average_distance, proximity_score } = json.json;
      setCardValues({
        minimum_distance: minimum_distance,
        average_distance: average_distance,
        proximity_score: proximity_score,
      });
    }
  }, [json]);

  return (
    <ul className={classes.stats}>
      <StatCard
        label="Minimum Distance"
        score={cardValues.minimum_distance}
        Icon={FiBarChart}
      />
      <StatCard
        label="Average Distance"
        score={cardValues.average_distance}
        Icon={FiActivity}
      />
      <StatCard
        label="Proximity Score"
        score={cardValues.proximity_score}
        Icon={ImStatsBars2}
      />
      <StatCard label="TBD" score={56} Icon={FiTrendingUp} />
    </ul>
  );
}
