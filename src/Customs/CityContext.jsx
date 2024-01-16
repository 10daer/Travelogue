import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { UserContext } from "./userContext";

const CitiesContext = createContext();
const initState = {
  cities: [],
  currentCity: {},
  // error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/ready":
      return {
        ...state,
        cities: action.payload,
      };
    case "city/ready":
      return {
        ...state,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ currentCity, cities }, dispatch] = useReducer(reducer, initState);
  const [message, setMessage] = useState({});
  const { user, db, userIsAuthentic, setIsLoading } = UserContext();
  const collectionQueryRef = useRef();
  const collectionRef = useRef();

  const fetchData = useCallback(
    async function fetchData(arg) {
      if (arg === `${currentCity.id}`) return;
      setIsLoading(true);
      try {
        if (arg === "cities") {
          const snapshot = await getDocs(collectionQueryRef.current);
          const cities = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          dispatch({ type: "cities/ready", payload: cities });
        } else {
          const docRef = doc(db, `Users/User${user.userID}/Adventures/${arg}`);
          const result = await getDoc(docRef);
          const data = { ...result.data(), id: result.id };
          dispatch({ type: "city/ready", payload: data });
        }
      } catch (error) {
        dispatch({
          type: "error",
          payload: "There was an error loading the data",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [currentCity.id, user, setIsLoading, db]
  );

  useEffect(() => {
    if (!user) return;
    const docRef = doc(db, "Users", `User${user.userID}`);
    collectionRef.current = collection(docRef, "Adventures");
    collectionQueryRef.current = query(collectionRef.current, orderBy("date"));
    fetchData("cities");
  }, [userIsAuthentic, fetchData, db, user]);

  async function createData(arg) {
    setIsLoading(true);

    try {
      const data = await addDoc(collectionRef.current, {
        ...arg,
        date: serverTimestamp(),
      });
      const newData = { ...arg, id: data.id };
      dispatch({ type: "city/created", payload: newData });
      setMessage((prevMessage) => ({
        ...prevMessage,
        content: "Travel experience recorded! ✈️🌍",
        status: true,
      }));
    } catch (error) {
      // dispatch({
      //   type: "error",
      //   payload: "",
      // });
      setMessage((prevMessage) => ({
        ...prevMessage,
        content: "There was an error creating a city😞 ",
        status: true,
      }));
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(arg) {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, `Users/User${user.userID}/Adventures/${arg}`));
      dispatch({ type: "city/deleted", payload: arg });
      setMessage((prevMessage) => ({
        ...prevMessage,
        content: "Travel record deleted successfully! 🗑️",
        status: false,
      }));
    } catch (error) {
      // dispatch({
      //   type: "error",
      //   payload: "There was an error deleting the city😞",
      // });
      setMessage((prevMessage) => ({
        ...prevMessage,
        content: "There was an error deleting the city😞",
        status: true,
      }));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      fetchData("cities");
    },
    [fetchData]
  );

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        fetchData,
        createData,
        deleteCity,
        setMessage,
        message,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
