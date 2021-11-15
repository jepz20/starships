export const BASE_URL = "https://swapi.dev/api";

const endpoints = {
  starship: "/starships",
};

const doRequest = (url, method = "GET") => {
  return fetch(url, {
    method,
  }).then((res) => {
    return res.json();
  });
};

export const getStartships = (page = 1) => {
  const url = `${BASE_URL}${endpoints.starship}/?format=json&page=${page}`;
  return doRequest(url);
};
