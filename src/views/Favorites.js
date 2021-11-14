import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Detail, Header, Title } from "../shared/components/Text";
import { StartshipList } from "../starships/components/StarshipList";

export const Favorites = () => {
  const starships = useSelector((state) =>
    Object.keys(state.starships.favorites).map((name) => name)
  );
  const error = "";

  if (error) {
    return <div>Error loading ships</div>;
  }

  return (
    <div className="flex flex-col px-4 md:px-8">
      <Header>Favorites</Header>
      {starships.length === 0 ? (
        <div>
          <Title>No Favorites Yet!</Title>
          <Detail>
            <Link className="text-secondary" to="/">
              Look for some starships
            </Link>{" "}
            to add them here!
          </Detail>
        </div>
      ) : (
        <StartshipList starships={starships} showComments={true} />
      )}
    </div>
  );
};
