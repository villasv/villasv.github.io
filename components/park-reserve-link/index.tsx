import styles from "./styles.module.css";

export enum ParksOrg {
  ParksCanada,
}

export interface ParkReserveLinkProps {
  org: ParksOrg;
  checkInDate?: Date;
  checkOutDate?: Date;
  searchTime?: Date;
}

export async function ParkReserveLink(props: ParkReserveLinkProps) {
  const url = getReservationUrl(props);
  return (
    <a href={url.toString()} className={styles.link}>
      Reserve
    </a>
  );
}

export function getReservationUrl({
  org,
  checkInDate,
  checkOutDate,
  searchTime,
}: ParkReserveLinkProps): string {
  const url = new URL(baseUrl(org));
  url.searchParams.set("resourceLocationId", "-2147483623");
  url.searchParams.set("mapId", "-2147483535");
  url.searchParams.set("searchTabGroupId", "2");
  url.searchParams.set("bookingCategoryId", "1");

  const [t1, t2] = todayAndTomorrow();
  url.searchParams.set(
    "startDate",
    (checkInDate ?? t1).toLocaleDateString("sv")
  );
  url.searchParams.set(
    "endDate",
    (checkOutDate ?? t2).toLocaleDateString("sv")
  );

  url.searchParams.set("nights", "1"); // TODO: compute
  url.searchParams.set("isReserving", "true");
  url.searchParams.set("partySize", "2"); // TODO: prop param
  url.searchParams.set(
    "searchTime",
    (searchTime ?? new Date()).toLocaleString("sv").replace(" ", "T")
  );
  url.searchParams.set("flexibleSearch", "[false,false,null,1]"); // TODO how to use this?
  url.searchParams.set("filterData", '{"-32756":"[[1],0,0,0]"}'); // TODO how to use this?
  return url.toString();
}

function baseUrl(org: ParksOrg): string {
  switch (org) {
    case ParksOrg.ParksCanada:
      return "https://reservation.pc.gc.ca/create-booking/results";
    default:
      throw new Error(`${org} not mapped to a reservation website`);
  }
}

/**
 * Returns today and tomorrow to be used in search params.
 * @returns a pair of strings in yyyy-mm-dd format
 */
function todayAndTomorrow(): [Date, Date] {
  const offset = new Date().getTimezoneOffset();
  const today = new Date(new Date().getTime() - offset * 60 * 1000);
  const tomorrow = new Date(new Date().getTime() - offset * 60 * 1000);
  tomorrow.setDate(today.getDate() + 1);
  return [today, tomorrow];
}
