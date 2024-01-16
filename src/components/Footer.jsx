import styles from "./Footer.module.css";

function Footer({ style }) {
  return (
    <footer className={style ? styles.bottom : styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by WorldWise.inc
      </p>
    </footer>
  );
}

export default Footer;
