import { Outlet, useNavigate } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./SideBar.module.css";
import { memo, useState } from "react";
import { UserContext } from "../Customs/userContext";

const SideBar = memo(function SideBar() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const { user } = UserContext();

  function clickHandler() {
    if (!clicked) {
      navigate("profile");
    } else {
      navigate(-1);
    }
    setClicked((c) => !c);
  }

  return (
    <div className={styles.sidebar}>
      {!clicked ? (
        <div className={styles.container}>
          <img
            src="/profile.jpeg"
            alt="profile"
            onClick={clickHandler}
            className={styles.img}
          />
          <p style={{ alignSelf: "end", fontSize: "2rem", fontWeight: 600 }}>
            Welcome, {user.name}
          </p>
          <Logo classPos={true} />
        </div>
      ) : (
        <img
          src="/profile.jpeg"
          alt="profile"
          onClick={clickHandler}
          className={styles.img_active}
        />
      )}
      {!clicked ? <AppNav /> : ""}
      <Outlet />
      <Footer />
    </div>
  );
});

export default SideBar;
