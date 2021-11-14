export const BASE_URL = "https://swapi.dev/api";

const endpoints = {
  starship: "/starships",
};

const doRequest = (url, method = "GET") => {
  return fetch(url, {
    method,
  }).then((res) => res.json());
};

export const getInitialStarships = () => {
  const url = `${BASE_URL}${endpoints.starship}/?format=json`;
  return getStartships(url);
};

export const getStartships = (url) => {
  if (!url.startsWith(BASE_URL)) {
    return Promise.reject(new Error("getStartships: invalid url"));
  }

  return doRequest(url);
};
