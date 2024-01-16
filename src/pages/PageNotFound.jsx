import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function PageNotFound() {
  return (
    <div className={styles.product}>
      <PageNav />
      <section style={{ margin: 0, paddingLeft: "2rem", gap: "3rem" }}>
        <div>
          <h2 style={{ marginBottom: "1rem", fontSize: "4.5rem" }}>
            Uh-oh! Wrong Turn
          </h2>
          <p>
            It appears you&apos;ve veered off course. Fear not, even the most
            intrepid explorers take detours. Looks like your compass might need
            new batteries. Follow the pixel path or dance with the home button.
            Safe travels! 🌍✨ #LostButNotLeast
          </p>
          <Link to="/" className={styles.button}>
            Go Home
          </Link>
          <Footer style={true} />
        </div>
        <img
          src="./error.svg"
          alt="Error page"
          style={{ marginLeft: "8rem" }}
        />
      </section>
    </div>
  );
}
