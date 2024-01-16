import { useEffect } from "react";
import styles from "./Notification.module.css";
import { UserContext } from "../Customs/userContext";

function Notification({ message, time }) {
  const { dispatch } = UserContext();
  const success = time < 3.2;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: "closeMessage" });
    }, time * 1000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, time]);

  return (
    <div className={styles.notification}>
      <div
        className={`${styles.notification__body} ${
          success ? styles.green : styles.red
        }`}
      >
        <img
          src={success ? "/check.svg" : "/uncheck.svg"}
          alt={success ? "Success" : "Failure"}
          className={styles.icon}
        />
        {message}{" "}
      </div>
      {/* <div className={styles.notification__progress}></div> */}
    </div>
  );
}

export default Notification;
