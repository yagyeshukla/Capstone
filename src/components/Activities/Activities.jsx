import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { WebSocketContext } from "../../store/WebSocketContext";
import { WebSocketContextForklift } from "../../store/WebSocketContextForklift";

import { ZoomContext } from "../../store/ZoomContext";
import Activity from "../Activity/Activity";

import { Badge, Dropdown, ConfigProvider, notification } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { IoIosNotifications } from "react-icons/io";
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
      {
        type: "divider",
      },
      {
        label: "Reset",
        key: "1-4",
      },
    ],
  },
];

export default function Activities({ useCase }) {
  const [alerts, setAlerts] = useState([]);
  const [severity, setSeverity] = useState({
    high: true,
    medium: true,
    low: true,
  });

  const { json: jsonPPE } = useContext(WebSocketContext);
  const { json: jsonForklift } = useContext(WebSocketContextForklift);
  const { isZoomed } = useContext(ZoomContext);

  const handleFilterClick = (e) => {
    const label = e.domEvent.target.innerText;
    setSeverity((prev) => {
      return label === "Reset"
        ? {
            high: true,
            medium: true,
            low: true,
          }
        : {
            high: false,
            medium: false,
            low: false,
            [label.toLowerCase()]: true,
          };
    });
  };

  const notifyAlert = (alert) => {
    const { severity_level, event_type } = alert;

    let style = {};
    let icon = <InfoCircleOutlined />;

    switch (severity_level) {
      case "high":
        style = { borderLeft: "6px solid red" };
        icon = <InfoCircleOutlined style={{ color: "red" }} />;
        break;
      case "medium":
        style = { borderLeft: "6px solid orange" };
        icon = <InfoCircleOutlined style={{ color: "orange" }} />;
        break;
      case "low":
        style = { borderLeft: "6px solid green" };
        icon = <InfoCircleOutlined style={{ color: "green" }} />;
        break;
      default:
        break;
    }

    notification.open({
      message: event_type,
      description: `Alert of type ${severity_level} severity detected.`,
      style: {
        borderRadius: "4px",
        ...style,
      },
      icon,
      showProgress: true,
      pauseOnHover: true,
    });
  };

  useEffect(() => {
    if (jsonPPE) {
      const { json: cardJsonPPE } = jsonPPE;
      if (cardJsonPPE.category === "Alert") {
        localStorage.setItem(
          `${cardJsonPPE.event_type} ${cardJsonPPE.frame}`,
          JSON.stringify(jsonPPE)
        );
        setAlerts((prevAlerts) => [
          { ...cardJsonPPE, id: Date.now() },
          ...prevAlerts.map((alert) => ({
            ...alert,
            className: classes.moveDown,
          })),
        ]);
        notifyAlert(cardJsonPPE);
      }
    }
    //   if (jsonForklift) {
    //     const { json: cardJsonForklift } = jsonForklift;
    //     if (cardJsonForklift.category === "Alert") {
    //       setAlerts((prevAlerts) => [
    //         { ...cardJsonForklift, id: Date.now() },
    //         ...prevAlerts.map((alert) => ({
    //           ...alert,
    //           className: classes.moveDown,
    //         })),
    //       ]);
    //       notification.open({
    //         message: "New Alert",
    //         description: `Alert of type ${cardJsonPPE.event_type} detected.`,
    //         showProgress: true,
    //         pauseOnHover: true,
    //       });
    //     }
    //   }
  }, [jsonPPE]);

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
              <style>{`
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
            {alerts.map((alert, index) =>
              severity[alert.severity_level] === true ? (
                <NavLink
                  to={`/Alert/${alert.frame}`}
                  end
                  key={alert.id}
                  target="_blank"
                >
                  <Activity alert={alert} severity={alert.severity_level} />
                </NavLink>
              ) : undefined
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
