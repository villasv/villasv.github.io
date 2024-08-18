import {
  getReservationUrl,
  Park,
  CampingEquipmentType,
  ParkReserveParams,
} from "@/projects/outdoors/reservations";
import styles from "./styles.module.css";

export async function ParkReserveLink(props: ParkReserveParams) {
  const url = getReservationUrl(props);
  return (
    <a target="_blank" href={url.toString()} className={styles.link}>
      Reserve
    </a>
  );
}

export { Park, CampingEquipmentType };
