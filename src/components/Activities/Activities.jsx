import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { WebSocketContext } from "../../store/WebSocketContext";
import {WebSocketContextForklift} from "../../store/WebSocketContextForklift";

import { ZoomContext } from "../../store/ZoomContext";
import Activity from "../Activity/Activity";

import { Badge } from "antd";
import { IoIosNotifications } from "react-icons/io";

import { Dropdown, ConfigProvider } from "antd";
import { IoMdOptions } from "react-icons/io";

import classes from "./Activities.module.scss";

const items = [
  {
    key: "1",
    label: "Severity",
    children: [
      {
        key: "1-1",
        label: "High",
      },
      {
        key: "1-2",
        label: "Medium",
      },
      {
        key: "1-3",
        label: "Low",
      },
    ],
  },
];

export default function Activities({useCase}) {
  const [alerts, setAlerts] = useState([]);
  const [severity, setSeverity] = useState("high");
  const context = useCase === "forklift" ? WebSocketContextForklift : WebSocketContext;
  const { json} = useContext(context);
  const { isZoomed } = useContext(ZoomContext);

  const handleFilterClick = (e) => {
    const label = e.domEvent.target.innerText;
    setSeverity(label.toLowerCase());
  };

  useEffect(() => {
    if (json) {
      const { json: cardJson } = json;
      if (
        cardJson.category === "Alert" &&
        cardJson.severity_level === severity
      ) {
        setAlerts((prevAlerts) => [
          { ...cardJson, id: Date.now() },
          ...prevAlerts.map((alert) => ({
            ...alert,
            className: classes.moveDown,
          })),
        ]);
      }
    }
  }, [json]);

  return (
    <>
      <div
        className={
          isZoomed ? `${classes.zoom2}` : classes["activities-container"]
        }
      >
        <div className={classes.alertHeader}>
          <h3 className={classes["activities-heading"]}>Alerts</h3>
          <div>
            <ConfigProvider
              theme={{
                token: {
                  controlItemBgHover: "#1677ff",
                  fontSize: 16,
                },
              }}
            >
              <Dropdown
                menu={{
                  items,
                  onClick: handleFilterClick,
                }}
                trigger={["click"]}
              >
                <IoMdOptions className={classes.filterIcon} />
              </Dropdown>
              <style jsx global>{`
                .ant-dropdown-menu-item:hover,
                .ant-dropdown-menu-submenu-title:hover {
                  color: white !important;
                }
              `}</style>
            </ConfigProvider>

            <Badge count={alerts.length}>
              <IoIosNotifications className={classes.notificationIcon} />
            </Badge>
          </div>
        </div>

        <div
          className={isZoomed ? `${classes.zoom}` : classes["activities-box"]}
        >
          <ul className={classes["activities"]}>
            {alerts.map((alert, index) => (
              <NavLink
                to={`/Alert/${alert.frame}`}
                end
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                key={alert.id}
                target="_blank"
              >
                <Activity alert={alert} severity={alert.severity_level} />
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
