import {
  getReservationUrl,
  Park,
  ParkReserveParams,
} from "@/projects/outdoors/reservations";
import styles from "./styles.module.css";

export async function ParkReserveLink(props: ParkReserveParams) {
  const url = getReservationUrl(props);
  return (
    <a href={url.toString()} className={styles.link}>
      Reserve
    </a>
  );
}

export { Park };
