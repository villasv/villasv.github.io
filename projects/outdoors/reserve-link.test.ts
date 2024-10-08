import { CampingEquipmentType, getReservationUrl, Park } from "./reservations";

describe(getReservationUrl.name, () => {
  const defaultArgs = {
    searchTime: new Date(1704236645000), // 2024-01-02 3:04:05 PM (GMT-08:00)
    checkInDate: new Date(1704323045000), // 1 day after t0
    checkOutDate: new Date(1704409445000), // 1 day after t1
  };
  const defaultParams = [
    "&startDate=2024-01-03&endDate=2024-01-04&nights=1",
    "&isReserving=true&partySize=2",
    "&searchTime=2024-01-02T15%3A04%3A05",
    "&flexibleSearch=%5Bfalse%2Cfalse%2Cnull%2C1%5D",
  ];
  const defaultFrontcountryParams = [
    ...defaultParams,
    "&equipmentId=-32768", // frontcountry equipment
    "&subEquipmentId=-32768", // small tent
    "&filterData=%7B%7D", // no filter
  ];
  const defaultBackcountryParams = [
    ...defaultParams,
    "&equipmentId=-32767", // backcountry equipment
    "&subEquipmentId=-32758", // single tent
    "&filterData=%7B%7D", // no filter
  ];

  it("should work for Fort Langley National Historic Site", () => {
    const url = getReservationUrl({
      park: Park.FortLangleyNHS,
      ...defaultArgs,
    });
    const expectedUrl = [
      "https://reservation.pc.gc.ca/create-booking/results",
      "?searchTabGroupId=2", // accommodation
      "&bookingCategoryId=1", // accommodation
      "&mapId=-2147483535",
      "&resourceLocationId=-2147483623",
      ...defaultParams,
      "&filterData=%7B%22-32756%22%3A%22%5B%5B1%5D%2C0%2C0%2C0%5D%22%7D",
    ].join("");
    expect(url).toBe(expectedUrl);
  });

  it("should work for Gulf Islands National Park Reserve (frontcountry)", () => {
    const url = getReservationUrl({
      park: Park.GulfIslandsNPR,
      ...defaultArgs,
    });
    const expectedUrl = [
      "https://reservation.pc.gc.ca/create-booking/results",
      "?searchTabGroupId=0", // frontcountry
      "&bookingCategoryId=0", // frontcountry campsite
      "&mapId=-2147483478",
      ...defaultFrontcountryParams,
    ].join("");
    expect(url).toBe(expectedUrl);
  });

  it("should work for SMONEĆTEN", () => {
    const url = getReservationUrl({
      park: Park.SMONEĆTEN,
      ...defaultArgs,
    });
    const expectedUrl = [
      "https://reservation.pc.gc.ca/create-booking/results",
      "?searchTabGroupId=0", // frontcountry
      "&bookingCategoryId=0", // frontcountry campsite
      "&mapId=-2147483477",
      "&resourceLocationId=-2147483601",
      ...defaultFrontcountryParams,
    ].join("");
    expect(url).toBe(expectedUrl);
  });

  it("should work for Prior Centennial", () => {
    const url = getReservationUrl({
      park: Park.PriorCentennial,
      ...defaultArgs,
    });
    const expectedUrl = [
      "https://reservation.pc.gc.ca/create-booking/results",
      "?searchTabGroupId=0", // frontcountry
      "&bookingCategoryId=0", // frontcountry campsite
      "&mapId=-2147483475",
      "&resourceLocationId=-2147483600",
      ...defaultFrontcountryParams,
    ].join("");
    expect(url).toBe(expectedUrl);
  });

  it("should work for Gulf Islands National Park Reserve (backcountry)", () => {
    const url = getReservationUrl({
      park: Park.GulfIslandsNPR,
      preferType: CampingEquipmentType.Backcountry,
      ...defaultArgs,
    });
    const expectedUrl = [
      "https://reservation.pc.gc.ca/create-booking/results",
      "?searchTabGroupId=1", // backcountry
      "&bookingCategoryId=5", // backcountry campsite
      "&mapId=-2147483151",
      ...defaultBackcountryParams,
    ].join("");
    expect(url).toBe(expectedUrl);
  });

  it("should work for Narvaez Bay (Saturna Island)", () => {
    const url = getReservationUrl({
      park: Park.NarvaezBay,
      ...defaultArgs,
    });
    const expectedUrl = [
      "https://reservation.pc.gc.ca/create-booking/results",
      "?searchTabGroupId=1", // backcountry
      "&bookingCategoryId=5", // backcountry campsite
      "&mapId=-2147483471",
      "&resourceLocationId=-2147483598",
      ...defaultBackcountryParams,
    ].join("");
    expect(url).toBe(expectedUrl);
  });

  it("should work for Shingle Bay (Pender Island)", () => {
    const url = getReservationUrl({
      park: Park.ShingleBay,
      ...defaultArgs,
    });
    const expectedUrl = [
      "https://reservation.pc.gc.ca/create-booking/results",
      "?searchTabGroupId=1", // backcountry
      "&bookingCategoryId=5", // backcountry campsite
      "&mapId=-2147483473",
      "&resourceLocationId=-2147483598",
      ...defaultBackcountryParams,
    ].join("");
    expect(url).toBe(expectedUrl);
  });

  it("should work for Pacific Rim Park Reserve (frontcountry)", () => {
    const url = getReservationUrl({
      park: Park.PacificRimNPR,
      ...defaultArgs,
    });
    const expectedUrl = [
      "https://reservation.pc.gc.ca/create-booking/results",
      "?searchTabGroupId=0", // frontcountry
      "&bookingCategoryId=0", // frontcountry campsite
      "&mapId=-2147483316",
      ...defaultFrontcountryParams,
    ].join("");
    expect(url).toBe(expectedUrl);
  });
});
