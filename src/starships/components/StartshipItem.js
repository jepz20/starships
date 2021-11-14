import React from "react";
import stockStarship from "../../imgs/stockStarship.png";
import stockStarshipMobile from "../../imgs/stockStarshipMobile.png";

import { FullStar, HalfStar } from "../../shared/components/Icons/Star";
import { Favorite } from "../../shared/components/Icons/Favorite";
import { responsizes } from "../../shared/utils/constants";
import { useWindowSize } from "../../shared/utils/useWindowsSize";
import { useDispatch, useSelector } from "react-redux";
import { starshipFavoriteToggle } from "../starshipsSlice";

const Detail = ({ children, className }) => {
  return <div className={`text-lg ${className}`}>{children}</div>;
};

const Title = ({ children, className }) => {
  return (
    <div className={`font-bold text-2xl pb-4 ${className}`}>{children}</div>
  );
};

const Rating = ({ rating, className }) => {
  try {
    const parsedRating = parseFloat(rating);
    const fullStars = Math.floor(parsedRating);
    const decimals = parsedRating % 1;
    const halfStar = decimals >= 0.5;
    return (
      <div className={`flex flex-row gap-2 ${className}`}>
        {Array(fullStars)
          .fill(0)
          .map((_, idx) => (
            <FullStar key={`start_${idx}`} />
          ))}
        {halfStar && <HalfStar />}
      </div>
    );
  } catch (e) {
    return null;
  }
};

export const StarshipImage = ({ name }) => {
  const windowSize = useWindowSize();
  return (
    <img
      className="rounded-2xl w-card-image-s h-card-image-s md:h-auto md:w-card-image-m"
      src={windowSize < responsizes.md ? stockStarshipMobile : stockStarship}
      alt={`${name}`}
    />
  );
};

export const Startship = ({ name }) => {
  const starship = useSelector((state) => state.starships.entities[name]);
  const dispatch = useDispatch();
  if (!starship) {
    return null;
  }

  return (
    <div className="w-card-s md:w-card-m bg-card rounded-2xl p-6 flex flex-row gap-x-2 bg-secondary">
      <div className="flex-1">
        <Title>{starship.name}</Title>
        <Detail className="pb-4 md:pb-2">{starship.manufacturer}</Detail>
        <Rating className="pb-2" rating={starship.hyperdrive_rating} />
        <Detail>Passengers: {starship.passengers}</Detail>
      </div>
      <div className="relative">
        <button
          onClick={() => {
            dispatch(starshipFavoriteToggle({ name: starship.name }));
          }}
          className="flex justify-center items-center absolute bg-secondary w-11 h-11 rounded-full right-2 top-3"
        >
          <Favorite
            className={`stroke-current stroke-3 text-secondary ${
              starship.favorite ? "fill-current" : ""
            }`}
          />
        </button>

        <StarshipImage name={starship.name} />
      </div>
    </div>
  );
};
