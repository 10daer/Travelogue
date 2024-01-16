import { useReducer, useState } from "react";
import styles from "./Profile.module.css";
import { UserContext } from "../Customs/userContext";
import Button from "./Button";

function Profile() {
  const { user } = UserContext();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");

  function handleClick(e) {
    e.preventDefault();
    setEdit((e) => !e);
  }

  function editable() {
    setEdit((e) => !e);
  }
  return (
    <>
      <p className={styles.name}>{user.name}</p>
      <p className={styles.edit} onClick={editable}>
        Edit{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <g data-name="Layer 2">
            <path
              d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"
              data-name="email"
            ></path>
          </g>
        </svg>
      </p>
      <div className={styles.profile}>
        <h1>Personal Information</h1>

        <div style={{ marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.75rem", marginLeft: "4rem" }}>Bio</h3>
          <p className={edit ? styles.hidden : styles.answer}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            quod at dignissimos pariatur voluptatibus delectus sunt impedit
            praesentium corporis ab rerum dolorem nulla, soluta vero inventore
            ad reprehenderit beatae nisi!
          </p>
          <textarea
            name={bio}
            onChange={(e) => setBio(e.target.value)}
            id="bio"
            cols="30"
            rows="10"
            className={!edit ? styles.hidden : styles.bio}
          ></textarea>
          <div className={styles.container}>
            <div className={styles.flex}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
              >
                <g data-name="Layer 2">
                  <path
                    d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"
                    data-name="email"
                  ></path>
                </g>
              </svg>
              <span>Email</span>
            </div>
            <p className={edit ? styles.hidden : ""}>{user.email}</p>
            <input
              type="text"
              className={!edit ? styles.hidden : ""}
              id="email"
              name={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.container}>
            <div className={styles.flex}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 100 100"
              >
                <path d="M79.535 27.4c-.32-1.201-.971-2.48-1.452-3.6C72.324 9.96 59.741 5 49.581 5 35.98 5 21 14.12 19 32.919v3.841c0 .16.055 1.6.134 2.32 1.121 8.959 8.19 18.48 13.47 27.439 5.68 9.599 11.574 19.041 17.415 28.479 3.6-6.159 7.188-12.399 10.707-18.399.959-1.761 2.071-3.521 3.031-5.201.64-1.119 1.862-2.238 2.421-3.279C71.857 57.722 81 47.24 81 36.92v-4.24c0-1.119-1.387-5.039-1.465-5.28M49.83 46.68c-3.998 0-8.374-1.999-10.534-7.52-.322-.879-.296-2.64-.296-2.801v-2.48c0-7.038 5.976-10.239 11.175-10.239 6.4 0 11.351 5.121 11.351 11.521S56.23 46.68 49.83 46.68"></path>
              </svg>
              <span>Location</span>
            </div>
            <p className={edit ? styles.hidden : ""}>Berlin, Germany</p>
            <input
              type="text"
              className={!edit ? styles.hidden : ""}
              id="location"
            />
          </div>

          <div className={styles.container}>
            <div className={styles.flex}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
              >
                <g data-name="Layer 2">
                  <path
                    d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"
                    data-name="email"
                  ></path>
                </g>
              </svg>
              <span>Email</span>
            </div>
            <p className={edit ? styles.hidden : ""}>{user.email}</p>
            <input
              type="text"
              className={!edit ? styles.hidden : ""}
              id="email"
            />
          </div>

          <div className={styles.container}>
            <div className={styles.flex}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
              >
                <g data-name="Layer 2">
                  <path
                    d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"
                    data-name="email"
                  ></path>
                </g>
              </svg>
              <span>Travel Status</span>
            </div>
            <p className={edit ? styles.hidden : ""}>Solo Traveller</p>
            <select
              name={status}
              onChange={(e) => setStatus(e.target.value)}
              id="status"
              className={!edit ? styles.hidden : ""}
            >
              <option value="solo-traveller">Solo Traveller</option>
              <option value="couple"> With Couple</option>
              <option value="crowd">With Crowd</option>
            </select>
          </div>
        </div>

        {edit ? (
          <div
            style={{
              marginRight: "2rem",
              justifySelf: "end",
              marginBottom: "1rem",
            }}
          >
            <Button type="primary" onClick={handleClick}>
              Submit
            </Button>
          </div>
        ) : (
          ""
        )}

        <div className={styles.data}>
          <h1>Statistics</h1>
          <ul>
            <li>
              <p>Number of trips</p>
              <span>place</span>
            </li>
            <li>
              <p>Favourite city</p>
              <span>place</span>
            </li>
            <li>
              <p>Favourite country</p>
              <span>place</span>
            </li>
            <li>
              <p>Favourite Adventures</p>
              <span>place</span>
              <span>place</span>
            </li>
            <li>
              <p>Favourite Places</p>
              <span>place</span>
            </li>
            <li>
              <p>Favourite Transport</p>
              <span>place</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile;
