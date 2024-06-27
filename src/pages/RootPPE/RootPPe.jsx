import { useContext } from "react";
import classes from "./RootPPE.module.scss";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import DashboardPPE from "../../components/Dashboard/DashboardPPE/DashboardPPE";
import { ZoomContext } from "../../store/ZoomContext";
import DonutChart from "../../components/Charts/DonutChart/DonutChart";
const RootPPE = () => {
  const { isZoomed, toggleZoom } = useContext(ZoomContext);
  console.log(isZoomed);
  return (
      <div className={classes.container}>
        {!isZoomed && <Header />}
        <div className={classes.content}>
          {!isZoomed && <Sidebar />}
          <DashboardPPE />
        </div>
        {!isZoomed && <Footer />}
      </div>
  );
};

export default RootPPE;
