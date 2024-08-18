export enum Park {
  FortLangleyNHS,
  GulfIslandsNPR,
  SMONEĆTEN,
  PriorCentennial,
  SidneySpit,
}

export enum Org {
  ParksCanada,
  BCParks,
}

export enum Group {
  Frontcountry = 0,
  Backcountry = 1,
  Accommodations = 2,
  DayUse = 3,
}

export enum Category {
  Campsite = 0,
  Accommodation = 1,
  GroupCampsite = 2,
  BackcountryCampsite = 5,
  BackcountryZone = 7,
}

export enum EquipmentClass {
  Frontcountry = "-32768",
  Backcountry = "-32767",
}

export enum FrontcountryEquip {
  SmallTent = "-32768",
  MediumTent = "-32767",
  LargeTent = "-32766",
  VanOrPickup = "-32765",
}

export interface FrontcountryEquipSpec {
  type: EquipmentClass.Frontcountry;
  subtype: FrontcountryEquip[];
}

export type EquipmentSpec = FrontcountryEquipSpec;

export interface ParkInfo {
  org: Org;
  group: Group;
  category: Category;
  mapId: string;
  resourceLocationId?: string;
  equipment?: EquipmentSpec;
}

function getParkInfo(park: Park): ParkInfo {
  return PARKS[park];
}

export interface ParkReserveParams {
  park: Park;
  checkInDate?: Date;
  checkOutDate?: Date;
  searchTime?: Date;
}

export function getReservationUrl({
  park,
  checkInDate,
  checkOutDate,
  searchTime,
}: ParkReserveParams): string {
  const { org, group, category, mapId, resourceLocationId, equipment } =
    getParkInfo(park);
  const url = new URL(baseUrl(org));
  url.searchParams.set("searchTabGroupId", group.toString());
  url.searchParams.set("bookingCategoryId", category.toString());
  url.searchParams.set("mapId", mapId);
  if (resourceLocationId)
    url.searchParams.set("resourceLocationId", resourceLocationId);

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

  if (equipment) {
    url.searchParams.set("equipmentId", equipment.type);
    url.searchParams.set("subEquipmentId", equipment.subtype[0]);
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

const _defaultEquipSpec: EquipmentSpec = {
  type: EquipmentClass.Frontcountry,
  subtype: [
    FrontcountryEquip.SmallTent,
    FrontcountryEquip.MediumTent,
    FrontcountryEquip.LargeTent,
  ],
};

const PARKS: Record<Park, ParkInfo> = {
  [Park.FortLangleyNHS]: {
    org: Org.ParksCanada,
    group: Group.Accommodations,
    category: Category.Accommodation,
    mapId: "-2147483535",
    resourceLocationId: "-2147483623",
  },
  [Park.GulfIslandsNPR]: {
    org: Org.ParksCanada,
    group: Group.Frontcountry,
    category: Category.Campsite,
    mapId: "-2147483478",
    equipment: _defaultEquipSpec,
  },
  [Park.SMONEĆTEN]: {
    org: Org.ParksCanada,
    group: Group.Frontcountry,
    category: Category.Campsite,
    mapId: "-2147483477",
    resourceLocationId: "-2147483601",
    equipment: _defaultEquipSpec,
  },
  [Park.PriorCentennial]: {
    org: Org.ParksCanada,
    group: Group.Frontcountry,
    category: Category.Campsite,
    mapId: "-2147483475",
    resourceLocationId: "-2147483600",
    equipment: _defaultEquipSpec,
  },
  [Park.SidneySpit]: {
    org: Org.ParksCanada,
    group: Group.Frontcountry,
    category: Category.Campsite,
    mapId: "-2147483476",
    resourceLocationId: "-2147483599",
    equipment: _defaultEquipSpec,
  },
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
