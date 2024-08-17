import { ParksOrg, getReservationUrl } from "@/components/park-reserve-link";

describe(getReservationUrl.name, () => {
  const t0 = new Date(1704236645000); // 2024-01-02 3:04:05 PM (GMT-08:00)
  const t1 = new Date(1704323045000); // 1 day after t0
  const t2 = new Date(1704409445000); // 1 day after t1

  it("should work for Fort Langley National Historic Site", () => {
    const url = getReservationUrl({
      org: ParksOrg.ParksCanada,
      checkInDate: t1,
      checkOutDate: t2,
      searchTime: t0,
    });

    const expectedUrl = [
      "https://reservation.pc.gc.ca/create-booking/results",
      "?resourceLocationId=-2147483623&mapId=-2147483535",
      "&searchTabGroupId=2&bookingCategoryId=1",
      "&startDate=2024-01-03&endDate=2024-01-04&nights=1",
      "&isReserving=true&partySize=2",
      "&searchTime=2024-01-02T15%3A04%3A05",
      "&flexibleSearch=%5Bfalse%2Cfalse%2Cnull%2C1%5D",
      "&filterData=%7B%22-32756%22%3A%22%5B%5B1%5D%2C0%2C0%2C0%5D%22%7D",
    ].join("");
    expect(url).toBe(expectedUrl);
  });
});
