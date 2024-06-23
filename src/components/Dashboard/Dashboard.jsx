import { useState, useContext } from "react";
import Activities from "../Activities/Activities";
import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardStats2 from "../DashboardStats/DashboardStats2.jsx";
import LiveStream from "../LiveStream/LiveStream";
import classes from "./Dashboard.module.scss";
import { ZoomContext } from "../../store/ZoomContext.jsx";

export default function Dashboard() {
  const { isZoomed, toggleZoom } = useContext(ZoomContext);
  console.log(isZoomed);
  return (
    <>
      <main className={classes.dashboard}>
        {!isZoomed && <DashboardStats />}
        <div className={classes["dashboard-overview"]}>
          <LiveStream isZoomed={isZoomed} handleZoomClick={toggleZoom} />
          <Activities />
        </div>
      </main>
    </>
  );
}
