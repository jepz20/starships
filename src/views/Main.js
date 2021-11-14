import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../shared/components/Button";
import { Header } from "../shared/components/Header";
import { StartshipList } from "../starships/components/StarshipList";
import { fetchStarships } from "../starships/starshipsSlice";

export const Main = () => {
  const starships = useSelector((state) => state.starships.ids);
  const error = "";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStarships());
  }, [dispatch]);

  if (error) {
    return <div>Error loading ships</div>;
  }
  return (
    <div className="flex flex-col px-4 md:px-8">
      <Header>Starship List</Header>
      <StartshipList starships={starships} />
      <div className="flex flex-row gap-2 py-11 justify-center items-center">
        <Button>Previous Page</Button>
        <Button>Next Page</Button>
      </div>
    </div>
  );
};
