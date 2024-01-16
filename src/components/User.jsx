import { UserContext } from "../Customs/userContext";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";

function User() {
  const { user, logout } = UserContext();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user} onClick={handleClick}>
      <img src="" alt="logout-icon" />
      <button>Logout</button>
    </div>
  );
}

export default User;
