import React, { act } from "react";
import { createRoot } from "react-dom/client";
import Episodes from "./Episodes";
import { episodesApi } from "../services/api";

jest.mock("../services/api", () => ({
  episodesApi: { getAll: jest.fn() },
}));

const season1Episodes = [
  { id: 11, title: "Season one premiere", season_number: 1, season_id: 101, episode_number: 1 },
];
const season2Episodes = [
  { id: 21, title: "Season two premiere", season_number: 2, season_id: 202, episode_number: 1 },
  { id: 22, title: "Season two finale", season_number: 2, season_id: 202, episode_number: 2 },
];
const allEpisodes = [...season1Episodes, ...season2Episodes];
const directResponse = (episodes) => ({ data: episodes });
const nestedResponse = (episodes) => ({ data: { data: episodes } });
const loadingText = "Loading episodes...";
const errorText = "Failed to load episodes";

let container;
let root;
let previousActEnvironment;

beforeEach(() => {
  previousActEnvironment = window.IS_REACT_ACT_ENVIRONMENT;
  window.IS_REACT_ACT_ENVIRONMENT = true;
  episodesApi.getAll.mockReset();
  // A nonzero epoch makes the original cache valid after the initial load.
  // No time passes between resolving that load and clicking a season.
  jest.spyOn(Date, "now").mockReturnValue(1700000000000);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  try {
    await act(async () => {
      root.unmount();
    });
  } finally {
    container.remove();
    jest.restoreAllMocks();
    episodesApi.getAll.mockReset();
    if (previousActEnvironment === undefined) {
      delete window.IS_REACT_ACT_ENVIRONMENT;
    } else {
      window.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
    }
  }
});

function queueRequest() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  episodesApi.getAll.mockReturnValueOnce(promise);
  return { promise, resolve, reject };
}

async function resolveRequest(request, response) {
  await act(async () => {
    request.resolve(response);
    await request.promise;
  });
}

async function rejectRequest(request) {
  await act(async () => {
    request.reject(new Error("Obsolete season request failed"));
    await request.promise.catch(() => {});
  });
}

async function clickFilter(label) {
  const button = Array.from(container.querySelectorAll("button")).find(
    (candidate) => candidate.textContent === label,
  );
  expect(button).toBeDefined();
  await act(async () => {
    button.click();
  });
}

function expectTitles(episodes) {
  expect(
    Array.from(container.querySelectorAll("h3")).map((title) => title.textContent),
  ).toEqual(episodes.map((episode) => episode.title));
}

function expectLoading() {
  expect(container.textContent).toContain(loadingText);
  expect(container.textContent).not.toContain(errorText);
  expectTitles([]);
}

function expectLoaded(episodes) {
  expect(container.textContent).not.toContain(loadingText);
  expect(container.textContent).not.toContain(errorText);
  expectTitles(episodes);
}

function expectFilters() {
  expect(
    Array.from(container.querySelectorAll("button")).map((button) => button.textContent),
  ).toEqual(["All Seasons", "Season 1", "Season 2"]);
}

async function loadInitialEpisodes(responseEnvelope = directResponse) {
  const initial = queueRequest();
  await act(async () => {
    root.render(<Episodes />);
  });
  expect(episodesApi.getAll).toHaveBeenCalledTimes(1);
  expect(episodesApi.getAll).toHaveBeenNthCalledWith(1, {});
  expectLoading();
  await resolveRequest(initial, responseEnvelope(allEpisodes));
  expectLoaded(allEpisodes);
  expectFilters();
}

async function startOverlappingSeasonRequests() {
  await loadInitialEpisodes();
  const older = queueRequest();
  await clickFilter("Season 1");
  expect(episodesApi.getAll).toHaveBeenNthCalledWith(2, { season_id: 101 });
  const latest = queueRequest();
  await clickFilter("Season 2");
  expect(episodesApi.getAll).toHaveBeenCalledTimes(3);
  expect(episodesApi.getAll).toHaveBeenNthCalledWith(3, { season_id: 202 });
  expectLoading();
  return { older, latest };
}

test.each([
  ["direct", directResponse],
  ["nested", nestedResponse],
])(
  "A1: selecting Season 2 immediately after initial load displays only Season 2 episodes (%s envelope)",
  async (_name, responseEnvelope) => {
    await loadInitialEpisodes(responseEnvelope);
    const season2 = queueRequest();
    await clickFilter("Season 2");

    expect(episodesApi.getAll).toHaveBeenCalledTimes(2);
    expect(episodesApi.getAll).toHaveBeenNthCalledWith(2, { season_id: 202 });
    expectLoading();
    await resolveRequest(season2, responseEnvelope(season2Episodes));
    expectLoaded(season2Episodes);
    expectFilters();
    // One click suffices; a second click must not be needed to refresh the data.
    expect(episodesApi.getAll).toHaveBeenCalledTimes(2);
  },
);

test("A2: an older success cannot overwrite the newer selected season", async () => {
  const { older, latest } = await startOverlappingSeasonRequests();
  await resolveRequest(latest, nestedResponse(season2Episodes));
  expectLoaded(season2Episodes);

  await resolveRequest(older, directResponse(season1Episodes));
  expectLoaded(season2Episodes);
  expectFilters();
  expect(episodesApi.getAll).toHaveBeenCalledTimes(3);
});

test("A2: an older success cannot finish loading while the latest season request is pending", async () => {
  const { older, latest } = await startOverlappingSeasonRequests();
  await resolveRequest(older, nestedResponse(season1Episodes));
  expectLoading();
  expectFilters();

  await resolveRequest(latest, directResponse(season2Episodes));
  expectLoaded(season2Episodes);
});

test("A2: an older rejection cannot show an error or finish loading while the latest request is pending", async () => {
  const { older, latest } = await startOverlappingSeasonRequests();
  await rejectRequest(older);
  expectLoading();
  expectFilters();

  await resolveRequest(latest, nestedResponse(season2Episodes));
  expectLoaded(season2Episodes);
});

test("A2: an older rejection cannot change the latest season's loaded data or show an error", async () => {
  const { older, latest } = await startOverlappingSeasonRequests();
  await resolveRequest(latest, directResponse(season2Episodes));
  expectLoaded(season2Episodes);

  await rejectRequest(older);
  expectLoaded(season2Episodes);
  expectFilters();
});

test("A3: returning to All Seasons displays all episodes", async () => {
  await loadInitialEpisodes(nestedResponse);
  const season2 = queueRequest();
  await clickFilter("Season 2");
  expect(episodesApi.getAll).toHaveBeenNthCalledWith(2, { season_id: 202 });
  await resolveRequest(season2, directResponse(season2Episodes));
  expectLoaded(season2Episodes);
  expectFilters();

  const all = queueRequest();
  await clickFilter("All Seasons");
  expect(episodesApi.getAll).toHaveBeenCalledTimes(3);
  expect(episodesApi.getAll).toHaveBeenNthCalledWith(3, {});
  expectLoading();
  await resolveRequest(all, nestedResponse(allEpisodes));
  expectLoaded(allEpisodes);
  expectFilters();

  // Returning to all must also clear the selection, not just refresh the list.
  const reselected = queueRequest();
  await clickFilter("Season 2");
  expect(episodesApi.getAll).toHaveBeenNthCalledWith(4, { season_id: 202 });
  await resolveRequest(reselected, directResponse(season2Episodes));
  expectLoaded(season2Episodes);
});

test("A3: clicking the selected Season 2 again deselects it and displays all episodes", async () => {
  await loadInitialEpisodes();
  const season2 = queueRequest();
  await clickFilter("Season 2");
  expect(episodesApi.getAll).toHaveBeenNthCalledWith(2, { season_id: 202 });
  await resolveRequest(season2, nestedResponse(season2Episodes));
  expectLoaded(season2Episodes);
  expectFilters();

  const all = queueRequest();
  await clickFilter("Season 2");
  expect(episodesApi.getAll).toHaveBeenCalledTimes(3);
  expect(episodesApi.getAll).toHaveBeenNthCalledWith(3, {});
  expectLoading();
  await resolveRequest(all, directResponse(allEpisodes));
  expectLoaded(allEpisodes);
  expectFilters();
});

test("A3: clicking All Seasons when already on all seasons safely displays all episodes", async () => {
  await loadInitialEpisodes();
  const all = queueRequest();
  await clickFilter("All Seasons");
  expect(episodesApi.getAll).toHaveBeenCalledTimes(2);
  expect(episodesApi.getAll).toHaveBeenNthCalledWith(2, {});
  expectLoading();
  await resolveRequest(all, nestedResponse(allEpisodes));
  expectLoaded(allEpisodes);
  expectFilters();
});
