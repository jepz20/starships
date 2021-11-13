import { useEffect, useState } from "react";
import { getInitialStarships } from "../api/swapi";
import { Button } from "./Button";
import { Header } from "./Header";
import { StartshipList } from "./StarshipList";

export const Main = () => {
  const [ships, updateShips] = useState([]);
  const [error, updateError] = useState();
  useEffect(() => {
    getInitialStarships()
      .then((data) => {
        updateShips(data.results);
        updateError();
      })
      .catch((e) => {
        updateError(e);
        updateShips([]);
      });
  }, []);
  if (error) {
    return <div>Error loading ships</div>;
  }
  return (
    <div className="flex flex-col px-4 md:px-8">
      <Header>Starship List</Header>
      <StartshipList ships={ships} />
      <div className="flex flex-row gap-2 py-11 justify-center items-center">
        <Button>Previous Page</Button>
        <Button>Next Page</Button>
      </div>
    </div>
  );
};


