import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryButton } from "../shared/components/Button";
import { Header } from "../shared/components/Text";
import { Spinner } from "../shared/components/Spinner";
import { itemsPerPage } from "../shared/utils/constants";
import { StartshipList } from "../starships/components/StarshipList";
import { fetchStarships } from "../starships/starshipsSlice";

const getNextItemStart = (itemStart) => {
  return itemStart + itemsPerPage;
};

const getNextPage = (starships) => {
  return Math.ceil(starships.length / itemsPerPage + 1);
};

const areItemsinStore = (itemStart, starships) => {
  const nextStart = getNextItemStart(itemStart);
  return nextStart < starships.length;
};

const handleNextPage = (
  dispatch,
  starships,
  hasMore,
  itemStart,
  updateItemStart
) => {
  const itemsNotInStore = !areItemsinStore(itemStart, starships);
  if (!hasMore && itemsNotInStore) {
    return;
  }
  if (hasMore && itemsNotInStore) {
    const nextPage = getNextPage(starships);
    dispatch(fetchStarships(nextPage));
  }
  updateItemStart(getNextItemStart(itemStart));
};

const handlePreviousPage = (itemStart, updateItemStart) => {
  if (itemStart === 0) {
    return;
  }
  updateItemStart(itemStart - itemsPerPage);
};

export const Main = () => {
  const {
    ids: starships,
    hasMore,
    status,
    error,
  } = useSelector((state) => state.starships);

  const [itemStart, updateItemStart] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStarships());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // lazy load the next items
    if (
      status !== "loading" &&
      hasMore &&
      !areItemsinStore(itemStart, starships)
    ) {
      dispatch(fetchStarships(getNextPage(starships)));
    }
  }, [itemStart, status, hasMore, dispatch, starships]);

  if (error) {
    return <div>Error loading ships</div>;
  }

  if (status === "loading" && itemStart >= starships.length) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col px-4 md:px-8">
      <Header>Starship List</Header>
      <StartshipList
        starships={starships.slice(itemStart, itemStart + itemsPerPage)}
      />
      <div className="flex flex-row gap-2 py-11 justify-center items-center">
        <PrimaryButton
          disabled={itemStart === 0}
          onClick={() => handlePreviousPage(itemStart, updateItemStart)}
        >
          Previous Page
        </PrimaryButton>
        <PrimaryButton
          disabled={!hasMore && !areItemsinStore(itemStart, starships)}
          onClick={() =>
            handleNextPage(
              dispatch,
              starships,
              hasMore,
              itemStart,
              updateItemStart
            )
          }
        >
          Next Page
        </PrimaryButton>
      </div>
    </div>
  );
};
