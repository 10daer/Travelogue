import styles from "./Button.module.css";

function Button({ children, onClick, type, disable, purpose }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
      disabled={disable}
      type={purpose}
    >
      {children}
    </button>
  );
}

export default Button;
