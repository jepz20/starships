import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Detail, Header, Title } from "../shared/components/Text";
import { StartshipList } from "../starships/components/StarshipList";

export const Favorites = () => {
  const starships = useSelector((state) =>
    Object.keys(state.starships.favorites).map((name) => name)
  );

  let Component;
  switch (true) {
    case starships.length === 0:
      Component = (
        <div>
          <Title>No Favorites Yet!</Title>
          <Detail>
            <Link className="text-secondary" to="/">
              Look for some starships
            </Link>{" "}
            to add them here!
          </Detail>
        </div>
      );
      break;
    default:
      Component = <StartshipList starships={starships} showComments={true} />;
  }

  return (
    <div className="flex flex-col px-4 md:px-8 justify-start items-start">
      <Header>Favorites</Header>
      {Component}
    </div>
  );
};
