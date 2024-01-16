// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { usePosition } from "../hooks/usePosition";
import Message from "./Message";
import Spinner from "./Spinner";
import useCities from "../Customs/useCities";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Customs/userContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
const initState = {
  country: "",
  cityName: "",
  date: new Date(),
  notes: "",
  formIsLoading: false,
  formError: null,
  emoji: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, formIsLoading: true, formError: "" };

    case "error":
      return { ...state, formError: action.payload, formIsLoading: false };

    case "fillForm":
      return {
        ...state,
        cityName: action.payload.city || action.payload.locality || "",
        country: action.payload.countryName,
        emoji: convertToEmoji(action.payload.countryCode),
        formIsLoading: false,
      };

    case "note":
      return { ...state, notes: action.payload };

    case "name":
      return { ...state, cityName: action.payload };

    case "date":
      return { ...state, date: action.payload };

    default:
      throw new Error("Unknown Action");
  }
}

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [posLat, posLng] = usePosition();
  const {  createData } = useCities();
  const {isLoading} = UserContext()
  const navigate = useNavigate();
  const [
    { cityName, country, emoji, date, notes, formError, formIsLoading },
    dispatch,
  ] = useReducer(reducer, initState);

  useEffect(
    function () {
      async function getLocale() {
        if (!posLat && !posLng) return;
        dispatch({ type: "loading" });

        try {
          const res = await fetch(
            `${BASE_URL}latitude=${posLat}&longitude=${posLng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else! 🙂"
            );
          dispatch({ type: "fillForm", payload: data });
        } catch (error) {
          dispatch({ type: "error", payload: error.message });
        }
      }
      getLocale();
    },
    [posLat, posLng]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: posLat, lng: posLng },
    };
    createData(newCity);
    navigate("/app/cities");
  }

  if (formIsLoading) return <Spinner />;
  if (!posLat && !posLng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (formError) return <Message message={formError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
          value={cityName}
          className={styles.input__form}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(date) => dispatch({ type: "date", payload: date })}
          selected={date}
          format="dd/mm/yyyy"
          className={styles.input__form}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({ type: "note", payload: e.target.value })}
          value={notes}
          className={styles.input__text}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
