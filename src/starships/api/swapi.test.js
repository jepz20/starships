import { getStartships } from "./swapi";

const response = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      name: "Naboo star skiff",
      model: "J-type star skiff",
      manufacturer:
        "Theed Palace Space Vessel Engineering Corps/Nubia Star Drives, Incorporated",
      cost_in_credits: "unknown",
      length: "29.2",
      max_atmosphering_speed: "1050",
      crew: "3",
      passengers: "3",
      cargo_capacity: "unknown",
      consumables: "unknown",
      hyperdrive_rating: "0.5",
      MGLT: "unknown",
      starship_class: "yacht",
      pilots: [
        "https://swapi.dev/api/people/10/",
        "https://swapi.dev/api/people/35/",
      ],
      films: ["https://swapi.dev/api/films/6/"],
      created: "2014-12-20T19:55:15.396000Z",
      edited: "2014-12-20T21:23:49.948000Z",
      url: "https://swapi.dev/api/starships/64/",
    },
  ],
};
beforeEach(() => {
  fetch.resetMocks();
});
afterAll(() => {
  fetch.resetMocks();
});

test("should get startships with an url", async () => {
  fetch.mockResponseOnce(JSON.stringify(response));
  const data = await getStartships(2);
  await expect(data).toEqual(response);
});
