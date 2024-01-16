import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import { memo } from "react";

const AppNav = memo(function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
});

export default AppNav;
