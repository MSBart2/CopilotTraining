import React from "react";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import Episodes from "./Episodes";
import { episodesApi } from "../services/api";

jest.mock("../services/api", () => ({
  episodesApi: {
    getAll: jest.fn(),
  },
}));

const response = (episodes) => ({ data: { data: episodes } });

const deferred = () => {
  let resolve;
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
};

const allSeasonEpisodes = (seasonOneId, seasonTwoId) => [
  {
    id: `${seasonOneId}-episode`,
    title: "Season 1 episode",
    season_number: 1,
    episode_number: 1,
    season_id: seasonOneId,
  },
  {
    id: `${seasonTwoId}-episode`,
    title: "Season 2 episode",
    season_number: 2,
    episode_number: 1,
    season_id: seasonTwoId,
  },
];

let container;
let root;
let cacheClock = Date.now();

beforeEach(() => {
  // Keep the module-level cache from an earlier test outside its 30-second window.
  cacheClock += 60_000;
  jest.spyOn(Date, "now").mockReturnValue(cacheClock);
  episodesApi.getAll.mockReset();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});

const clickSeason = (number) => {
  const button = Array.from(container.querySelectorAll("button")).find(
    (candidate) => candidate.textContent === `Season ${number}`,
  );
  button.click();
};

describe("Episodes season filtering", () => {
  test("A1: Selecting Season 2 shortly after initial load shows only Season 2 episodes", async () => {
    const episodes = allSeasonEpisodes("a1-season-1", "a1-season-2");
    episodesApi.getAll.mockImplementation((params) =>
      Promise.resolve(
        response(
          params.season_id
            ? episodes.filter((episode) => episode.season_id === params.season_id)
            : episodes,
        ),
      ),
    );

    await act(async () => {
      root.render(<Episodes />);
      await Promise.resolve();
    });
    expect(container.textContent).toContain("Season 1 episode");
    expect(container.textContent).toContain("Season 2 episode");

    await act(async () => {
      clickSeason(2);
      await Promise.resolve();
    });

    expect(container.textContent).toContain("Season 2 episode");
    expect(container.textContent).not.toContain("Season 1 episode");
    expect(episodesApi.getAll).toHaveBeenLastCalledWith({
      season_id: "a1-season-2",
    });
  });

  test("A2: A late response for an outdated season cannot replace the current selection", async () => {
    const episodes = allSeasonEpisodes("a2-season-1", "a2-season-2");
    const outdatedRequest = deferred();
    const currentRequest = deferred();
    episodesApi.getAll.mockImplementation((params) => {
      if (!params.season_id) return Promise.resolve(response(episodes));
      if (params.season_id === "a2-season-1") return outdatedRequest.promise;
      return currentRequest.promise;
    });

    await act(async () => {
      root.render(<Episodes />);
      await Promise.resolve();
    });

    act(() => clickSeason(1));
    act(() => clickSeason(2));

    await act(async () => {
      currentRequest.resolve(response([episodes[1]]));
      await currentRequest.promise;
    });
    expect(container.textContent).toContain("Season 2 episode");
    expect(container.textContent).not.toContain("Season 1 episode");

    await act(async () => {
      outdatedRequest.resolve(response([episodes[0]]));
      await outdatedRequest.promise;
    });

    expect(container.textContent).toContain("Season 2 episode");
    expect(container.textContent).not.toContain("Season 1 episode");
  });
});
