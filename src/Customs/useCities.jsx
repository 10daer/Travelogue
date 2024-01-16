import { useContext } from "react";
import { CitiesContext } from "./CityContext";

export default function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the Cities Provider");
  return context;
}
