import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";
import { UserContext } from "../Customs/userContext";

export default function Homepage() {
  const { userIsAuthentic } = UserContext();
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={userIsAuthentic ? "/app" : "/login"} className="cta">
          <svg>
            <rect
              x="0"
              y="0"
              fill="none"
              width="100%"
              height="100%"
              rx="8"
              ry="8"
            />
          </svg>
          {!userIsAuthentic ? "Start Tracking Now" : "Continue Tracking..."}
        </Link>
      </section>
    </main>
  );
}
