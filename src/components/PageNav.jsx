import { Link, NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { UserContext } from "../Customs/userContext";

function PageNav() {
  const { userIsAuthentic, user } = UserContext();
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Homepage</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>{" "}
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>{" "}
        <li>
          {!userIsAuthentic ? (
            <NavLink to="/login" className={styles.ctaLink}>
              Join
            </NavLink>
          ) : (
            <Link to="/app">
              <div className={styles.user}>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            </Link>
          )}
        </li>{" "}
      </ul>
    </nav>
  );
}

export default PageNav;
