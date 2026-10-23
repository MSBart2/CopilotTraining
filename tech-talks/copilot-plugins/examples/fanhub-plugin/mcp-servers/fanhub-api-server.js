const http = require("http");
const readline = require("readline");

const API_BASE_URL = process.env.FANHUB_API_URL || "http://localhost:5265";

function send(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
}

function sendError(id, code, message) {
  process.stdout.write(
    JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }) + "\n",
  );
}

function getJson(path) {
  return new Promise((resolve, reject) => {
    http
      .get(`${API_BASE_URL}${path}`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode >= 400) {
            reject(new Error(`API returned ${res.statusCode}: ${data}`));
            return;
          }
          resolve(JSON.parse(data));
        });
      })
      .on("error", reject);
  });
}

function postJson(path, body) {
  const bodyStr = JSON.stringify(body);
  const apiUrl = new URL(path, API_BASE_URL);
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        path: apiUrl.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(bodyStr),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode >= 400) {
            reject(new Error(`API returned ${res.statusCode}: ${data}`));
            return;
          }
          resolve(JSON.parse(data));
        });
      },
    );
    req.on("error", reject);
    req.write(bodyStr);
    req.end();
  });
}

const TOOLS = [
  // --- Characters ---
  {
    name: "get_characters",
    description: "Fetch all characters from the FanHub API",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_character_by_id",
    description: "Fetch a single character by ID from the FanHub API",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Character ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "create_character",
    description: "Create a new character via the FanHub API",
    inputSchema: {
      type: "object",
      properties: {
        showId: { type: "number", description: "Show ID (1 for Breaking Bad)" },
        name: { type: "string", description: "Character name" },
        actorName: { type: "string", description: "Actor's real name" },
        bio: { type: "string", description: "Character biography" },
        tagline: { type: "string", description: "Character tagline or quote" },
        characterType: {
          type: "string",
          description: "e.g. Hero, Villain, Antihero, Comic Relief",
        },
        isMainCharacter: {
          type: "boolean",
          description: "Is a main character",
        },
        status: {
          type: "string",
          description: "alive or deceased",
        },
        imageUrl: { type: "string", description: "URL to character image" },
      },
      required: ["showId", "name"],
    },
  },
  // --- Episodes ---
  {
    name: "get_episodes",
    description:
      "Fetch all episodes from the FanHub API, optionally filtered by season number",
    inputSchema: {
      type: "object",
      properties: {
        season: {
          type: "number",
          description: "Optional season number to filter by",
        },
      },
    },
  },
  {
    name: "get_episode_by_id",
    description: "Fetch a single episode by ID from the FanHub API",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Episode ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "create_episode",
    description: "Create a new episode via the FanHub API",
    inputSchema: {
      type: "object",
      properties: {
        showId: { type: "number", description: "Show ID (1 for Breaking Bad)" },
        seasonId: { type: "number", description: "Season ID" },
        title: { type: "string", description: "Episode title" },
        episodeNumber: {
          type: "number",
          description: "Episode number within the season",
        },
        airDate: { type: "string", description: "Air date (ISO 8601)" },
        synopsis: { type: "string", description: "Episode synopsis" },
        directedBy: { type: "string", description: "Director name" },
        writtenBy: { type: "string", description: "Writer name" },
      },
      required: ["showId", "seasonId", "title", "episodeNumber"],
    },
  },
  // --- Quotes ---
  {
    name: "get_quotes",
    description: "Fetch all quotes from the FanHub API",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_quote_by_id",
    description: "Fetch a single quote by ID from the FanHub API",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Quote ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "like_quote",
    description: "Increment the like count on a quote",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Quote ID to like" },
      },
      required: ["id"],
    },
  },
  {
    name: "create_quote",
    description: "Create a new quote via the FanHub API",
    inputSchema: {
      type: "object",
      properties: {
        showId: { type: "number", description: "Show ID (1 for Breaking Bad)" },
        characterId: {
          type: "number",
          description: "ID of the character who said it",
        },
        episodeId: {
          type: "number",
          description: "ID of the episode it appears in",
        },
        quoteText: { type: "string", description: "The quote text" },
        isFamous: {
          type: "boolean",
          description: "Whether this is a famous quote",
        },
      },
      required: ["showId", "characterId", "quoteText"],
    },
  },
  // --- Shows ---
  {
    name: "get_shows",
    description: "Fetch all shows from the FanHub API",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_show_by_id",
    description: "Fetch a single show by ID from the FanHub API",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Show ID" },
      },
      required: ["id"],
    },
  },
  // --- Lore ---
  {
    name: "get_lore",
    description: "Fetch all lore entries from the FanHub API",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "create_lore",
    description: "Create a new lore entry via the FanHub API",
    inputSchema: {
      type: "object",
      properties: {
        showId: { type: "number", description: "Show ID (1 for Breaking Bad)" },
        category: {
          type: "string",
          description:
            "Category (e.g. Location, Faction, Story Beat, Theme, Production)",
        },
        title: { type: "string", description: "Title of the lore entry" },
        description: {
          type: "string",
          description: "Full description of the lore entry",
        },
      },
      required: ["showId", "category", "title", "description"],
    },
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", async (line) => {
  let request;
  try {
    request = JSON.parse(line);
  } catch {
    return;
  }

  const { id, method, params } = request;

  if (method === "initialize") {
    send(id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "fanhub-api", version: "1.0.0" },
    });
    return;
  }

  if (method === "notifications/initialized") {
    return; // no response needed
  }

  if (method === "tools/list") {
    send(id, { tools: TOOLS });
    return;
  }

  if (method === "tools/call") {
    const tool = params.name;
    const args = params.arguments || {};

    try {
      let data;

      switch (tool) {
        // Characters
        case "get_characters":
          data = await getJson("/api/characters");
          break;
        case "get_character_by_id":
          data = await getJson(`/api/characters/${args.id}`);
          break;
        case "create_character":
          data = await postJson("/api/characters", args);
          break;

        // Episodes
        case "get_episodes": {
          const query = args.season ? `?season=${args.season}` : "";
          const raw = await getJson(`/api/episodes${query}`);
          // Episodes controller wraps response in { success, count, data }
          data = raw.data !== undefined ? raw.data : raw;
          break;
        }
        case "get_episode_by_id":
          data = await getJson(`/api/episodes/${args.id}`);
          break;
        case "create_episode":
          data = await postJson("/api/episodes", args);
          break;

        // Quotes
        case "get_quotes":
          data = await getJson("/api/quotes");
          break;
        case "get_quote_by_id":
          data = await getJson(`/api/quotes/${args.id}`);
          break;
        case "like_quote":
          data = await postJson(`/api/quotes/${args.id}/like`, {});
          break;
        case "create_quote":
          data = await postJson("/api/quotes", args);
          break;

        // Shows
        case "get_shows":
          data = await getJson("/api/shows");
          break;
        case "get_show_by_id":
          data = await getJson(`/api/shows/${args.id}`);
          break;

        // Lore
        case "get_lore":
          data = await getJson("/api/lore");
          break;
        case "create_lore":
          data = await postJson("/api/lore", args);
          break;

        default:
          sendError(id, -32601, `Unknown tool: ${tool}`);
          return;
      }

      send(id, { content: [{ type: "text", text: JSON.stringify(data) }] });
    } catch (err) {
      send(id, {
        content: [{ type: "text", text: `Error: ${err.message}` }],
        isError: true,
      });
    }
    return;
  }

  // Unknown method
  sendError(id, -32601, `Method not found: ${method}`);
});
