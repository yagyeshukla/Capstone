import logo from "../../assets/icons/logo.svg";
import dropdown from "../../assets/icons/dropdown.svg";
import classes from "./Header.module.scss";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.header__logo}>
        <img src={logo} alt="Logo" className={classes["header__logo-icon"]} />
        <span className={classes.header__title}>Incident Management</span>
      </div>
      {/* <div className={classes.header__profile}>
        <div className={classes["header__profile-icon"]}>JS</div>
        <div className={classes["header__profile-name"]}>
          Jacqueline Salazarera
        </div>
        <div className={classes.header__profile - dropdown}>
          <img src={dropdown} alt="dropdown-icon" />
        </div>
      </div> */}
    </header>
  );
}

export default Header;
