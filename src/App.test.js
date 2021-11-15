import React from "react";
import { render, screen, fireEvent } from "./testUtils";
import App from "./App";

beforeEach(() => {
  fetch.resetMocks();
});
afterAll(() => {
  fetch.resetMocks();
});

const createMockStarships = (id) => {
  return {
    name: `test ${id}`,
    model: `testModel ${id}`,
    passengers: "3",
    hyperdrive_rating: "2.5",
  };
};

const createListOfStarships = (start, amount) => {
  const starships = [];
  for (let index = start; index < start + amount; index++) {
    starships.push(createMockStarships(index));
  }
  return starships;
};

test("normal operations", async () => {
  let results = createListOfStarships(0, 10);
  results[5].hyperdrive_rating = "abc"
  fetch.mockResponseOnce(JSON.stringify({ next: "next", results }));
  fetch.mockResponseOnce(
    JSON.stringify({ results: createListOfStarships(10, 10) })
  );
  render(<App />);
  const goHome = screen.getByTestId("gohome-link");
  expect(goHome).toBeInTheDocument();
  let goToFavorites = screen.getByText(/View Favorites/i);
  expect(goToFavorites).toBeInTheDocument();

  // shows loader before elements are fetch
  const loadingSpinner = screen.getByTestId("loading-spinner-main");
  expect(loadingSpinner).toBeInTheDocument();

  // show state on the first page
  expect(await screen.findByText(/test 0/i)).toBeInTheDocument();

  // empty favorites
  fireEvent.click(goToFavorites);
  expect(screen.queryByText(/View Favorites/i)).toBeNull();
  expect(await screen.findByText(/No Favorites Yet!/i)).toBeInTheDocument();

  // go back to main
  fireEvent.click(goHome);
  expect(await screen.findByText(/test 2/i)).toBeInTheDocument();
  expect(screen.getByText(/View Favorites/i)).toBeInTheDocument();

  // test actions in first page
  let previousButton = screen.getByText(/Previous Page/i);
  let nextButton = screen.getByText(/Next Page/i);
  expect(previousButton).toHaveAttribute("disabled");
  expect(nextButton).not.toHaveAttribute("disabled");

  // test disable previous button does nothing on click
  fireEvent.click(previousButton);
  expect(await screen.findByText(/test 2/i)).toBeInTheDocument();

  // show state on the last page
  fireEvent.click(nextButton);
  expect(screen.queryByText(/test 11/i)).toBeInTheDocument();
  expect(screen.queryByText(/test 0/i)).toBeNull();

  let favoriteButton11 = screen.getByTestId(`favorite-icon-test 11`);
  fireEvent.click(favoriteButton11);

  nextButton = screen.getByText(/Next Page/i);
  previousButton = screen.getByText(/Previous Page/i);
  expect(nextButton).toHaveAttribute("disabled");
  expect(previousButton).not.toHaveAttribute("disabled");

  // go back to first page
  fireEvent.click(previousButton);
  expect(await screen.findByText(/test 0/i)).toBeInTheDocument();
  expect(screen.queryByText(/test 11/i)).toBeNull();

  // add a favorite
  let favoriteButton0 = screen.getByTestId(`favorite-icon-test 0`);
  let favoriteButton2 = screen.getByTestId(`favorite-icon-test 2`);
  expect(favoriteButton0).not.toHaveClass("fill-current");
  expect(favoriteButton2).not.toHaveClass("fill-current");
  fireEvent.click(favoriteButton0);
  expect(favoriteButton0).toHaveClass("fill-current");
  expect(favoriteButton2).not.toHaveClass("fill-current");

  // go to favorites
  goToFavorites = screen.getByText(/View Favorites/i);
  fireEvent.click(goToFavorites);
  expect(await screen.findByText(/test 0/i)).toBeInTheDocument();
  expect(await screen.findByText(/test 11/i)).toBeInTheDocument();
  expect(screen.queryByText(/View Favorites/i)).toBeNull();
  expect(screen.queryByText(/test 2/i)).toBeNull();

  // add comment
  let commentTextArea = screen.getByTestId(`comments-textarea-test 0`);
  fireEvent.change(commentTextArea, { target: { value: "test comment" } });
  expect(commentTextArea.value).toBe("test comment");
  fireEvent.change(commentTextArea, {
    target: { value: "test comment addon" },
  });
  expect(commentTextArea.value).toBe("test comment addon");
});

test("error state", async () => {

  fetch.mockRejectOnce("Some Error")
  render(<App />);
  const goHome = screen.getByTestId("gohome-link");
  expect(goHome).toBeInTheDocument();
  fireEvent.click(goHome);
  let goToFavorites = screen.getByText(/View Favorites/i);
  expect(goToFavorites).toBeInTheDocument();

  // shows loader before elements are fetch
  const loadingSpinner = screen.getByTestId("loading-spinner-main");
  expect(loadingSpinner).toBeInTheDocument();

  // show state on the first page
  expect(await screen.findByText(/Error loading/i)).toBeInTheDocument();

});
