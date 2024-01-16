import useCities from "../Customs/useCities";
import { UserContext } from "../Customs/userContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList() {
  const { cities } = useCities();
  const {isLoading} = UserContext()


  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Click on the map to add a city you have visited" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
