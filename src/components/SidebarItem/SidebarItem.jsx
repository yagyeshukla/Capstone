import { NavLink } from "react-router-dom";
import classes from "./SidebarItem.module.scss";
function SidebarItem({ Icon, label, to, isCollapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${classes["side-nav__item"]} ${classes.active}`
          : `${classes["side-nav__item"]}`
      }
      // target="_blank"
    >
      <div
        className={
          isCollapsed
            ? `${classes.iconContainer} ${classes.iconBox}`
            : classes.iconBox
        }
      >
        <Icon className={classes["side-nav__icon"]} />
      </div>

      {!isCollapsed && <p className={classes["side-nav__label"]}>{label}</p>}
    </NavLink>
  );
}

export default SidebarItem;
