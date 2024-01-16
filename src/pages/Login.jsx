import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { UserContext } from "../Customs/userContext";
import Button from "../components/Button";
import Notification from "../components/Notification";
import Logo from "../components/Logo";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const [loginPressed, setLoginPressed] = useState(null);
  const [attribute, setAttribute] = useState(false);
  const navigate = useNavigate();

  const {
    login,
    userIsAuthentic,
    isLoading,
    googleSignin,
    notificationTime,
    message,
    signup,
  } = UserContext();

  useEffect(
    function () {
      if (userIsAuthentic) {
        navigate("/app", { replace: true });
      }
    },
    [userIsAuthentic, navigate]
  );

  function iconClick() {
    setAttribute((attrib) => !attrib);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return;
    setLoginPressed(true);
    login(email, password);
  }

  function handleSignup(e) {
    e.preventDefault();
    if (!email || !password || !name) return;
    setLoginPressed(true);
    signup(name, email, password);
  }

  function toggleReg() {
    setRegister((prevRegister) => !prevRegister);
    setName("");
    setEmail("");
    setPassword("");
  }

  function GoogleSign(e) {
    e.preventDefault();
    setLoginPressed(false);
    googleSignin();
  }

  return (
    <main className={styles.login}>
      {message && <Notification message={message} time={notificationTime} />}
      <form
        className={styles.form}
        onSubmit={register ? handleSignup : handleLogin}
      >
        <Logo reduce={true} />
        {register && (
          <div className={styles.input__wrapper}>
            <input
              type="name"
              id="name"
              required
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={styles.input__field}
            />
            <label htmlFor="name" className={styles.input__label}>
              Name
            </label>
          </div>
        )}

        <div className={styles.input__wrapper}>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className={styles.input__field}
          />
          <label htmlFor="email" className={styles.input__label}>
            Email
          </label>
          <img
            alt="email-Icon"
            title="email-Icon"
            src="email.svg"
            className={styles.i__icon}
          />
        </div>

        <div className={styles.input__wrapper}>
          <input
            id="password"
            type={attribute ? "text" : "password"}
            value={password}
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
            title="Minimum 6 characters at least 1 Alphabet and 1 Number"
            // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
            required
            className={styles.input__field}
          />
          <label htmlFor="password" className={styles.input__label}>
            Password
          </label>
          <img
            onClick={iconClick}
            alt="Eye Icon"
            title="Eye Icon"
            src={attribute ? "eye-off.svg" : "eye.svg"}
            className={styles.input__icon}
          />
        </div>

        <div className={styles.divider}>or</div>

        <Button
          purpose="button"
          onClick={GoogleSign}
          type="google"
          disable={isLoading}
        >
          {isLoading && loginPressed === false ? (
            ""
          ) : (
            <p>Continue with Google</p>
          )}
          <div className={styles.container}>
            <span
              className={`${
                isLoading && !loginPressed && styles.google__verifying
              }`}
            ></span>
          </div>
        </Button>

        <div className={styles.footBtn}>
          <a onClick={toggleReg}>
            {register
              ? "Already have an account?"
              : "New here? Create an account!"}
          </a>
          <Button
            purpose="submit"
            type={isLoading && loginPressed ? "primary__blur" : "primary"}
            disable={isLoading}
          >
            {register ? "Register" : "Login"}
          </Button>
        </div>
      </form>
    </main>
  );
}
