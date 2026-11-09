import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { readStore, storePath, updateStore } from "../.github/extensions/talk-review/lib/store.mjs";
import { getBoard, getTalk } from "../.github/extensions/talk-review/lib/model.mjs";
import { InstanceServer } from "../.github/extensions/talk-review/lib/server.mjs";

const root = path.resolve(import.meta.dirname, "..");
const gitDir = execFileSync("git", ["rev-parse", "--git-common-dir"], { cwd: root, encoding: "utf8" }).trim();

async function fixture(t) {
  const dir = path.join(path.resolve(root, gitDir), "review-test-fixtures", randomUUID());
  await mkdir(path.join(dir, "tech-talks"), { recursive: true });
  t.after(() => rm(dir, { recursive: true, force: true }));
  return dir;
}

test("review writes preserve concurrent edits and recover after a rejected write", async (t) => {
  const dir = await fixture(t);
  await Promise.all(Array.from({ length: 10 }, (_, n) => updateStore(dir, (data) => {
    data.talks[`talk-${n}`] = { stage: "pushed" };
  })));
  assert.equal(Object.keys((await readStore(dir)).talks).length, 10);
  await assert.rejects(updateStore(dir, () => { throw new Error("rejected mutation"); }), /rejected mutation/);
  await updateStore(dir, (data) => { data.talks["talk-0"].note = "saved after failure"; });
  assert.equal((await readStore(dir)).talks["talk-0"].note, "saved after failure");
});

test("invalid review files are left unchanged", async (t) => {
  const dir = await fixture(t);
  const invalid = '{"version":999}';
  await writeFile(storePath(dir), invalid);
  await assert.rejects(updateStore(dir, () => {}), { code: "review_store_invalid" });
  assert.equal(await readFile(storePath(dir), "utf8"), invalid);
});

test("the published practitioner board has readable decks and complete tracking", async () => {
  const board = await getBoard();
  const talks = board.talks.filter((talk) => !talk.exec);
  assert.equal(talks.length, 14);
  for (const talk of talks) {
    assert.equal(talk.stage, "pushed", talk.slug);
    assert.equal(talk.kind, "native", talk.slug);
    assert.equal(talk.deckError, null, talk.slug);
    assert.ok(talk.slideCount > 0, talk.slug);
    const detail = await getTalk(talk.slug);
    assert.equal(detail.slides.length, talk.slideCount);
    assert.equal(detail.counts.unreviewed + detail.counts.ok + detail.counts.fixed + detail.counts["needs-fix"], talk.slideCount);
    assert.ok(detail.slides.every((slide) => slide.deck.includes(`#${encodeURIComponent(slide.id)}`)));
  }
});

test("review server serves the canvas, native decks, and JSON updates", async (t) => {
  const calls = [];
  const server = await new InstanceServer({
    api: {
      board: getBoard,
      talk: getTalk,
      setStage: async (...args) => { calls.push(args); return { saved: true }; }
    }
  }).start();
  t.after(() => server.close());
  const request = (url, opts) => fetch(new URL(url, server.url), opts);
  for (const url of ["/", "/app.js", "/app.css", "/deck/tech-talks/surfaces/index.html", "/deck/native/engine.js"]) {
    assert.equal((await request(url)).status, 200, url);
  }
  assert.equal((await (await request("/api/board")).json()).talks.length, 15);
  assert.ok((await (await request("/api/talk?talk=surfaces")).json()).slides.length > 0);
  const response = await request("/api/stage", {
    method: "POST",
    headers: { "content-type": "application/json", origin: server.origin },
    body: JSON.stringify({ talk: "surfaces", stage: "pushed" })
  });
  assert.equal(response.status, 200);
  assert.deepEqual(calls, [["surfaces", "pushed"]]);
  server.setFocus("surfaces");
  assert.equal((await (await request("/api/board")).json()).focus, "surfaces");
  assert.equal((await request("/api/talk?talk=missing")).status, 400);
});
