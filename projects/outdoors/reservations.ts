export enum Park {
  FortLangleyNHS,
  GulfIslandsNPR,
  SMONEĆTEN,
  PriorCentennial,
  SidneySpit,
  NarvaezBay,
  ShingleBay,
  FisgardLighthouseNHS,
  PacificRimNPR,
  // GreenPoint,
  // BrokenGroupIslands,
  // KeehaBeach,
  // WestCoastTrail,
}

export enum Org {
  ParksCanada,
  BCParks,
}

export enum ReservationGroup {
  FrontcountryCampground = "0",
  BackcountryCampground = "1",
  ParkAccommodation = "2",
  DayUse = "3",
}

export enum FrontcountryCategory {
  FrontcountryCampsite = "0",
  GroupCampsite = "2",
}

export enum BackcountryCategory {
  BackcountryCampsite = "5",
  BackcountryZone = "7",
}

export enum AccommodationCategory {
  Accommodation = "1",
}

export enum CampingEquipmentType {
  Frontcountry = "-32768",
  Backcountry = "-32767",
}

export enum FrontcountryCampingEquipment {
  SmallTent = "-32768",
  MediumTent = "-32767",
  LargeTent = "-32766",
  VanOrPickup = "-32765",
}

export interface FrontcountryAllowedEquipment {
  type: CampingEquipmentType.Frontcountry;
  equipment: FrontcountryCampingEquipment[];
}

export enum BackcountryCampingEquipment {
  OneTent = "-32758",
  TwoTents = "-32757",
  ThreeTents = "-32756",
  FourTents = "-32755",
}

export interface BackcountryAllowedEquipment {
  type: CampingEquipmentType.Backcountry;
  equipment: BackcountryCampingEquipment[];
}

export interface ParkAccommodation {
  org: Org;
  reservationGroup: ReservationGroup.ParkAccommodation;
  reservationCategory: AccommodationCategory.Accommodation;
  mapId: string;
  resourceLocationId?: string;
}

export interface FrontcountryCampground {
  org: Org;
  reservationGroup: ReservationGroup.FrontcountryCampground;
  reservationCategory: FrontcountryCategory;
  mapId: string;
  resourceLocationId?: string;
  allowedEquipment: FrontcountryAllowedEquipment;
}

export interface BackcountryCampground {
  org: Org;
  reservationGroup: ReservationGroup.BackcountryCampground;
  reservationCategory: BackcountryCategory;
  mapId: string;
  resourceLocationId?: string;
  allowedEquipment: BackcountryAllowedEquipment;
}

export interface ParkCampgrounds {
  accommodation?: ParkAccommodation;
  frontcountry?: FrontcountryCampground;
  backcountry?: BackcountryCampground;
}

export type ParkWithCampgrounds =
  | (ParkCampgrounds & { accommodation: ParkAccommodation })
  | (ParkCampgrounds & { frontcountry: FrontcountryCampground })
  | (ParkCampgrounds & { backcountry: BackcountryCampground });

export type Campground =
  | ParkAccommodation
  | FrontcountryCampground
  | BackcountryCampground;

export type Searchable = Campground | ParkWithCampgrounds;

function getSearchInfo(
  park: Park,
  preferType: CampingEquipmentType = CampingEquipmentType.Frontcountry
): Campground {
  const info = SEARCHABLE_SITES[park];
  if ("org" in info) return info;

  return (
    {
      [CampingEquipmentType.Frontcountry]:
        info.frontcountry ?? info.accommodation ?? info.backcountry,
      [CampingEquipmentType.Backcountry]:
        info.backcountry ?? info.frontcountry ?? info.accommodation,
    }[preferType] ||
    (() => {
      throw new Error("Somehow missing campground info");
    })()
  );
}

export interface ParkReserveParams {
  park: Park;
  preferType?: CampingEquipmentType;
  checkInDate?: Date;
  checkOutDate?: Date;
  searchTime?: Date;
}

export function getReservationUrl({
  park,
  preferType, // defaults to frontcountry if available
  checkInDate, // defaults to today
  checkOutDate, // defaults to tomorrow
  searchTime, // defaults to now
}: ParkReserveParams): string {
  const info = getSearchInfo(park, preferType);
  const url = new URL(baseUrl(info.org));
  url.searchParams.set("searchTabGroupId", info.reservationGroup);
  url.searchParams.set("bookingCategoryId", info.reservationCategory);
  url.searchParams.set("mapId", info.mapId);
  if (info.resourceLocationId)
    url.searchParams.set("resourceLocationId", info.resourceLocationId);

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

  if ("allowedEquipment" in info) {
    const { type, equipment } = info.allowedEquipment;
    url.searchParams.set("equipmentId", type);
    url.searchParams.set("subEquipmentId", equipment[0]);
    url.searchParams.set("filterData", "{}");
  } else {
    url.searchParams.set("filterData", '{"-32756":"[[1],0,0,0]"}'); // TODO how to use this?
  }
  return url.toString();
}

function baseUrl(org: Org): string {
  switch (org) {
    case Org.ParksCanada:
      return "https://reservation.pc.gc.ca/create-booking/results";
    default:
      throw new Error(`${org} not mapped to a reservation website`);
  }
}

const DEFAULT_FRONTCOUNTRY_CAMPGROUND_INFO: Omit<
  FrontcountryCampground,
  "org" | "mapId"
> = {
  reservationGroup: ReservationGroup.FrontcountryCampground,
  reservationCategory: FrontcountryCategory.FrontcountryCampsite,
  allowedEquipment: {
    type: CampingEquipmentType.Frontcountry,
    equipment: [
      FrontcountryCampingEquipment.SmallTent,
      FrontcountryCampingEquipment.MediumTent,
      FrontcountryCampingEquipment.LargeTent,
    ],
  },
};
const DEFAULT_BACKCOUNTRY_CAMPGROUND_INFO: Omit<
  BackcountryCampground,
  "org" | "mapId"
> = {
  reservationGroup: ReservationGroup.BackcountryCampground,
  reservationCategory: BackcountryCategory.BackcountryCampsite,
  allowedEquipment: {
    type: CampingEquipmentType.Backcountry,
    equipment: [
      BackcountryCampingEquipment.OneTent,
      BackcountryCampingEquipment.TwoTents,
    ],
  },
};

const SEARCHABLE_SITES: Record<Park, Searchable> = {
  [Park.FortLangleyNHS]: {
    org: Org.ParksCanada,
    reservationGroup: ReservationGroup.ParkAccommodation,
    reservationCategory: AccommodationCategory.Accommodation,
    mapId: "-2147483535",
    resourceLocationId: "-2147483623",
  },
  [Park.GulfIslandsNPR]: {
    frontcountry: {
      ...DEFAULT_FRONTCOUNTRY_CAMPGROUND_INFO,
      org: Org.ParksCanada,
      mapId: "-2147483478",
    },
    backcountry: {
      ...DEFAULT_BACKCOUNTRY_CAMPGROUND_INFO,
      org: Org.ParksCanada,
      mapId: "-2147483151",
    },
  },
  [Park.SMONEĆTEN]: {
    ...DEFAULT_FRONTCOUNTRY_CAMPGROUND_INFO,
    org: Org.ParksCanada,
    mapId: "-2147483477",
    resourceLocationId: "-2147483601",
  },
  [Park.PriorCentennial]: {
    ...DEFAULT_FRONTCOUNTRY_CAMPGROUND_INFO,
    org: Org.ParksCanada,
    mapId: "-2147483475",
    resourceLocationId: "-2147483600",
  },
  [Park.SidneySpit]: {
    ...DEFAULT_FRONTCOUNTRY_CAMPGROUND_INFO,
    org: Org.ParksCanada,
    mapId: "-2147483476",
    resourceLocationId: "-2147483599",
  },
  [Park.NarvaezBay]: {
    ...DEFAULT_BACKCOUNTRY_CAMPGROUND_INFO,
    org: Org.ParksCanada,
    mapId: "-2147483471",
    resourceLocationId: "-2147483598",
  },
  [Park.ShingleBay]: {
    ...DEFAULT_BACKCOUNTRY_CAMPGROUND_INFO,
    org: Org.ParksCanada,
    mapId: "-2147483473",
    resourceLocationId: "-2147483598",
  },
  [Park.FisgardLighthouseNHS]: {
    org: Org.ParksCanada,
    reservationGroup: ReservationGroup.ParkAccommodation,
    reservationCategory: AccommodationCategory.Accommodation,
    mapId: "-2147483533",
    resourceLocationId: "-2147483622",
  },
  [Park.PacificRimNPR]: {
    // accommodation: {},
    frontcountry: {
      ...DEFAULT_FRONTCOUNTRY_CAMPGROUND_INFO,
      org: Org.ParksCanada,
      mapId: "-2147483316",
    },
    backcountry: {
      ...DEFAULT_BACKCOUNTRY_CAMPGROUND_INFO,
      org: Org.ParksCanada,
      mapId: "-2147483575",
    },
  },
  // [Park.GreenPoint]: {
  //   org: Org.ParksCanada,
  // },
  // [Park.BrokenGroupIslands]: {
  //   org: Org.ParksCanada,
  // },
  // [Park.KeehaBeach]: {
  //   org: Org.ParksCanada,
  // },
  // [Park.WestCoastTrail]: {
  //   org: Org.ParksCanada,
  // },
};

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
