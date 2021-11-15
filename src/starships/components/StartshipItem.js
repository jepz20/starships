import React from "react";
import stockStarship from "../../imgs/stockStarship.png";
import stockStarshipMobile from "../../imgs/stockStarshipMobile.png";

import { FullStar, HalfStar } from "../../shared/components/Icons/Star";
import { Favorite } from "../../shared/components/Icons/Favorite";
import { responsizes } from "../../shared/utils/constants";
import { useWindowSize } from "../../shared/utils/useWindowsSize";
import { useDispatch, useSelector } from "react-redux";
import { starshipEditComment, starshipFavoriteToggle } from "../starshipsSlice";
import { Detail, Title } from "../../shared/components/Text";

const Rating = ({ rating, className }) => {
  try {
    const parsedRating = parseFloat(rating);
    const fullStars = Math.floor(parsedRating);
    const decimals = parsedRating % 1;
    const halfStar = decimals >= 0.5;
    return (
      <div className={`flex flex-row gap-2 ${className || ""}`}>
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

const StarshipImage = ({ name }) => {
  const windowSize = useWindowSize();
  return (
    <img
      className="rounded-2xl w-card-image-s h-card-image-s md:h-auto md:w-card-image-m"
      src={windowSize < responsizes.md ? stockStarshipMobile : stockStarship}
      alt={`${name}`}
    />
  );
};

const Comment = ({ comment, onChange, name }) => {
  return (
    <textarea
      onChange={onChange}
      value={comment}
      placeholder="Notes"
      data-testid={`comments-textarea-${name}`}
      className={`rounded-lg bg-secondary border border-grey p-2`}
    />
  );
};

export const Startship = ({ name, showComments }) => {
  const starship = useSelector((state) => state.starships.entities[name]);
  const favorite = useSelector((state) => !!state.starships.favorites[name]);
  const comment = useSelector((state) => state.starships.comments[name]);
  const dispatch = useDispatch();

  return (
    <div className="w-card-s md:w-card-m xl:w-card-xl bg-card rounded-2xl p-6 flex flex-col gap-4 bg-secondary">
      <div className="flex flex-row gap-x-2 md:h-44 xl:h-40">
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
              id={starship.name}
              className={`stroke-current stroke-3 text-secondary ${
                favorite ? "fill-current" : ""
              }`}
            />
          </button>

          <StarshipImage name={starship.name} />
        </div>
      </div>
      {showComments && (
        <Comment
          comment={comment}
          name={starship.name}
          onChange={(e) => {
            dispatch(
              starshipEditComment({
                name: starship.name,
                comment: e.target.value,
              })
            );
          }}
        />
      )}
    </div>
  );
};
