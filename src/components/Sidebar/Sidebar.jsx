import SidebarItem from "../SidebarItem/SidebarItem";
import Button from "../ui/Button/Button";
// import homeIcon from "../../assets/icons/home.svg";
import { FiHome } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";
import { LuForklift } from "react-icons/lu";

import classes from "./Sidebar.module.scss";
import { useState } from "react";

import axios from "axios";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const contentPPE = (
    <div>
      <p>PPE</p>
    </div>
  );
  const contentForklift = (
    <div>
      <p>Forklift</p>
    </div>
  );

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
  function handleSidebarIconClick() {
    setIsSidebarOpen((prevState) => !prevState);
  }
  return (
    <nav
      className={`${classes.sidebar} ${
        isSidebarOpen ? classes.open : classes.collapsed
      }`}
    >
      <ul className={classes["side-nav"]}>
        <div
          className={
            isSidebarOpen
              ? classes.sidebarHeader__open
              : classes.sidebarHeader__close
          }
        >
          <Button
            icon={
              isSidebarOpen ? (
                <GoSidebarExpand className={classes.expandIcon} />
              ) : (
                <GoSidebarCollapse className={classes.expandIcon} />
              )
            }
            handleClick={handleSidebarIconClick}
          ></Button>
          {isSidebarOpen && (
            <p className={classes["sidebarHeader__title"]}>Sidebar</p>
          )}
        </div>
        <SidebarItem
          to="/dashboard-ppe"
          Icon={FiHome}
          label="Dashboard PPE"
          isCollapsed={!isSidebarOpen}
          content={contentPPE}
          handleClick={handlePpeClick}
        />
        <SidebarItem
          to="/dashboard-forklift"
          Icon={LuForklift}
          label="Dashboard Forklift"
          isCollapsed={!isSidebarOpen}
          content={contentForklift}
          handleClick={handleForkliftClick}
        />
      </ul>
    </nav>
  );
}

export default Sidebar;
