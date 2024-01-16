import { createContext, useContext, useReducer, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import firebaseConfig from "../../config";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { useCallback } from "react";

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

const userAuthContext = createContext();
const initState = {
  user: null,
  userIsAuthentic: false,
  message: "",
  notificationTime: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "signin":
      return {
        ...state,
        user: action.payload,
        message: "Access Granted",
        userIsAuthentic: true,
        notificationTime: 3,
      };

    case "signup":
      return {
        ...state,
        user: action.payload,
        message: "Signup successful",
        userIsAuthentic: true,
        notificationTime: 3,
      };

    case "logout":
      return { ...initState, message: "", notificationTime: 3 };

    case "error":
      return {
        ...state,
        message: getErrorMessage(action.payload),
        userIsAuthentic: false,
        notificationTime: 4,
      };

    case "closeMessage":
      return {
        ...state,
        message: "",
        notificationTime: 0,
      };

    default:
      throw new Error("Unknown action");
  }
}

function getErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/email-already-exists":
      return "Email is already in use.";

    case "auth/internal-error":
      return "Internal server error. Contact support team.";

    case "auth/invalid-email":
      return "Invalid email address.";

    case "auth/invalid-email-verified":
      return "Unable to verify your email.";

    case "auth/invalid-password":
      return "Invalid password. Check again.";

    case "auth/invalid-photo-url":
      return "Unable to retrieve your profile picture.";

    case "auth/operation-not-allowed":
      return "Operation is not allowed";

    case "auth/phone-number-already-exists":
      return "Phone number is already in use.";

    case "auth/too-many-requests":
      return "Too many requests. Please try again later.";

    case "auth/uid-already-exists":
      return "UID is already in use.";

    case "auth/user-not-found":
      return "User not found.";

    case "Firebase: Error (auth/internal-error).":
      return "Poor internet connection";

    case "Firebase: Error (auth/network-request-failed).":
      return "Poor internet connection";

    case "Failed to get document because the client is offline.":
      return "User is unauthorized";

    default:
      return "An unexpected error occurred.";
  }
}

const FAKE_USER = {
  name: "jack",
  email: "jack@example.com",
  avatar: "https://i.pravatar.cc/100?u=323",
  password: "qwerty",
  uid: "qwertyuiooiuytreq23456789876543",
  emailVerified: true,
  isAnonymous: true,
  createdAt: new Date(),
  accessToken: "",
  message: "",
};

function UserAuthProvider({ children }) {
  const [{ user, userIsAuthentic, message, notificationTime }, dispatch] =
    useReducer(reducer, initState);
  const [isLoading, setIsLoading] = useState(false);

  function defineUser(user) {
    return {
      name: user.displayName || user.name,
      email: user.email,
      avatar: `https://i.pravatar.cc/100?u=${user.uid}`,
      userID: user.uid || user.userID,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      createdAt: user.createdAt || user.reloadUserInfo.createdAt,
      userToken: user.accessToken,
      message: "",
    };
  }

  function setUser(user) {
    Cookies.set("userSession", user.uid, {
      domain: window.location.hostname,
      secure: true,
      path: "/",
      sameSite: "strict",
    });
    return defineUser(user);
  }

  const readCookie = useCallback(async function (id) {
    try {
      const docRef = doc(db, `Users/User${id}`);
      const result = await getDoc(docRef);
      const sessionUser = defineUser(result.data());
      dispatch({ type: "signin", payload: sessionUser });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }, []);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      setUser(FAKE_USER);
      dispatch({ type: "signin", payload: FAKE_USER });
    }
  }

  async function checkForUser(user) {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const userIDs = querySnapshot.docs.map((doc) => doc.id);
      const finder = userIDs.find((el) => el === user.userID);
      if (finder === undefined) {
        try {
          await setDoc(doc(db, `Users/User${user.userID}`), user);
        } catch (error) {
          throw new Error(`${error}:Something went wrong`);
        }
      } else return;
    } catch (error) {
      throw new Error(`${error}:Something went wrong`);
    }
  }

  // function login(email, password) {
  //   setIsLoading(true);

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((cred) => {
  //       const user = setUser(cred.user);
  //       dispatch({ type: "signin", payload: user });
  //     })
  //     .catch((error) => {
  //       dispatch({ type: "error", payload: error.message });
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  async function signup(name, email, password) {
    setIsLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, {
        displayName: name,
        photoURL: `https://i.pravatar.cc/100?u=${cred.user.uid}`,
      });
      const user = setUser(cred.user);
      await setDoc(doc(db, `Users/User${user.userID}`), user);
      dispatch({ type: "signup", payload: user });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  async function googleSignin() {
    setIsLoading(true);

    try {
      const credential = await signInWithPopup(auth, provider);
      await updateProfile(credential.user, {
        photoURL: `https://i.pravatar.cc/100?u=${credential.user.uid}`,
      });
      const user = setUser(credential.user);
      checkForUser(user);
      dispatch({ type: "signin", payload: user });
    } catch (error) {
      const errorEmail = error.customData.email;
      dispatch({ type: "error", payload: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    try {
      await signOut(auth);
      Cookies.remove("userSession");
      dispatch({ type: "logout" });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <userAuthContext.Provider
      value={{
        user,
        userIsAuthentic,
        notificationTime,
        login,
        logout,
        setIsLoading,
        isLoading,
        googleSignin,
        signup,
        message,
        dispatch,
        db,
        readCookie,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

function UserContext() {
  const context = useContext(userAuthContext);
  if (context === undefined)
    throw new Error("User context was used outside the Provider");
  return context;
}

export { UserAuthProvider, UserContext };
