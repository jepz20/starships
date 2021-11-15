import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PrimaryButton } from "../shared/components/Button";
import { Header, Title } from "../shared/components/Text";
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

const areNextItemsinStore = (itemStart, starships) => {
  const nextStart = getNextItemStart(itemStart);
  return areItemsinStore(nextStart, starships);
};
const areItemsinStore = (itemStart, starships) => {
  return itemStart < starships.length;
};

const handleNextPage = (
  dispatch,
  starships,
  hasMore,
  itemStart,
  updateItemStart
) => {
  const itemsNotInStore = !areNextItemsinStore(itemStart, starships);
  if (hasMore && itemsNotInStore) {
    const nextPage = getNextPage(starships);
    dispatch(fetchStarships(nextPage));
  }
  updateItemStart(getNextItemStart(itemStart));
};

const handlePreviousPage = (itemStart, updateItemStart) => {
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
    if (starships.length === 0) {
      dispatch(fetchStarships());
    }
  }, [dispatch, starships]);

  useEffect(() => {
    window && window.scrollTo(0, 0);

    // lazy load the next items
    if (
      status !== "loading" &&
      hasMore &&
      !areNextItemsinStore(itemStart, starships) &&
      !error
    ) {
      dispatch(fetchStarships(getNextPage(starships)));
    }
  }, [itemStart, status, hasMore, dispatch, starships, error]);

  let Component;
  switch (true) {
    case status === "error":
      Component = <Title> ⚠️ Error loading ships {error}</Title>;
      break;
    case status === "loading" && !areItemsinStore(itemStart, starships):
      Component = <Spinner id="main" />;
      break;
    default:
      Component = (
        <div>
          <StartshipList
            starships={starships.slice(itemStart, itemStart + itemsPerPage)}
          />
          <div className="flex flex-row gap-2 py-11 justify-center items-center bottom-6">
            <PrimaryButton
              disabled={itemStart === 0}
              onClick={() => handlePreviousPage(itemStart, updateItemStart)}
            >
              Previous Page
            </PrimaryButton>
            <PrimaryButton
              disabled={!hasMore && !areNextItemsinStore(itemStart, starships)}
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
  }
  if (error) {
  }

  return (
    <div className="flex flex-col px-4 md:px-8">
      <Header>Starship List</Header>
      {Component}
    </div>
  );
};
