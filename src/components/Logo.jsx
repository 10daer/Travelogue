import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo({ reduce }) {
  return (
    <Link to="/">
      <img
        src="/logo.png"
        alt="WorldWise logo"
        className={reduce ? styles.reduce : styles.logo}
      />
    </Link>
  );
}

export default Logo;
