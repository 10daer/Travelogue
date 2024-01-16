import useCities from "../Customs/useCities";
import { UserContext } from "../Customs/userContext";
import Map from "../components/Map";
import Notification from "../components/Notification";
import SideBar from "../components/SideBar";
import User from "../components/User";
import styles from "./AppLayout.module.css";
import ProtectedRoutes from "./ProtectedRoutes";

function AppLayout() {
  const { notifier } = UserContext();
  const { message } = useCities();
  return (
    <ProtectedRoutes>
      <div className={styles.app}>
        {notifier && (
          <Notification success={!message.status} message={message.content} />
        )}
        <SideBar />
        <User />
        <Map />
      </div>
    </ProtectedRoutes>
  );
}

export default AppLayout;
