import reducer, {
  starshipFavoriteToggle,
  starshipEditComment,
  initialState,
  fetchStarships,
} from "./starshipsSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

test("should add a favorite if it doesn't exist", () => {
  const previousState = initialState;
  expect(
    reducer(previousState, starshipFavoriteToggle({ name: "test" }))
  ).toEqual({
    ...previousState,
    favorites: { test: true },
  });
});

test("should remove a favorite if already exists", () => {
  const previousState = {
    ...initialState,
    favorites: { test: true },
  };

  expect(
    reducer(previousState, starshipFavoriteToggle({ name: "test" }))
  ).toEqual({
    ...previousState,
    favorites: {},
  });
});

test("should add a comment for the first time", () => {
  const previousState = initialState;

  expect(
    reducer(
      previousState,
      starshipEditComment({ name: "test", comment: "test comment" })
    )
  ).toEqual({
    ...previousState,
    comments: { test: "test comment" },
  });
});

test("should modify an existing comment", () => {
  const previousState = {
    ...initialState,
    comments: { test: "test comment" },
  };

  expect(
    reducer(
      previousState,
      starshipEditComment({ name: "test", comment: "test comment changed" })
    )
  ).toEqual({
    ...previousState,
    comments: { test: "test comment changed" },
  });
});

test("should fetch starships and add them to the store", () => {
  const previousState = {
    ...initialState,
    ids: ["test0"],
    entities: {
      test0: { name: "test0" },
    },
  };
  let action = { type: fetchStarships.pending.type };
  let state = reducer(previousState, action);
  expect(state).toEqual({
    ...previousState,
    status: "loading",
  });
  action = {
    type: fetchStarships.fulfilled,
    payload: { results: [{ name: "test1" }, { name: "test2" }], next: "test" },
  };
  state = reducer(previousState, action);
  expect(state).toEqual({
    ...previousState,
    entities: {
      test0: { name: "test0" },
      test1: { name: "test1" },
      test2: { name: "test2" },
    },
    hasMore: true,
    ids: ["test0", "test1", "test2"],
    status: "idle",
  });
});

test("should fetch the last page of starships", () => {
  const previousState = {
    ...initialState,
    ids: ["test0"],
    entities: {
      test0: { name: "test0" },
    },
  };
  let action = {
    type: fetchStarships.fulfilled,
    payload: { results: [{ name: "test1" }, { name: "test2" }], next: null },
  };
  let state = reducer(previousState, action);
  expect(state).toEqual({
    ...previousState,
    entities: {
      test0: { name: "test0" },
      test1: { name: "test1" },
      test2: { name: "test2" },
    },
    hasMore: false,
    ids: ["test0", "test1", "test2"],
    status: "idle",
  });
});

test("should set errors", () => {
  const previousState = {
    ...initialState,
    ids: ["test0"],
    entities: {
      test0: { name: "test0" },
    },
  };
  let action = {
    type: fetchStarships.rejected,
    error: { message: "test error" },
  };

  let state = reducer(previousState, action);

  expect(state).toEqual({
    ...previousState,
    error: "test error",
    status: "error",
  });
});
