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

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          to="/dashboard"
          Icon={FiHome}
          label="Dashboard"
          isCollapsed={!isSidebarOpen}
        />
        <SidebarItem
          to="/forklift"
          Icon={LuForklift}
          label="Camera"
          isCollapsed={!isSidebarOpen}
        />
      </ul>
    </nav>
  );
}

export default Sidebar;
