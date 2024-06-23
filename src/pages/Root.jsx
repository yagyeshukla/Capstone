import { useContext } from "react";
import WebSocketContextProvider from "../store/WebSocketContext";
import classes from "../App.module.scss";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import Dashboard from "../components/Dashboard/Dashboard";
import { ZoomContext } from "../store/ZoomContext";
const Root = () => {
  const { isZoomed, toggleZoom } = useContext(ZoomContext);
  console.log(isZoomed);
  return (
    <WebSocketContextProvider>
      <div className={classes.container}>
        {!isZoomed && <Header />}
        <div className={classes.content}>
          <Sidebar />
          <Dashboard />
        </div>
        {<Footer />}
      </div>
    </WebSocketContextProvider>
  );
};

export default Root;
