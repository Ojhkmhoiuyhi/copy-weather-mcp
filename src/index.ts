#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { queryWeather } from "./weather.js";

const server = new McpServer({
  name: "weather-mcp",
  version: "0.0.2",
  capabilities: {
    tools: {},
  },
});

server.tool(
  "query-weather",
  "query weather for given city",
  {
    city: z.string().describe("city name"),
  },
  async ({ city }) => {
    if (!city) {
      throw new Error("city name is required");
    }

    try {
      const info = await queryWeather(city);

      return {
        content: [
          {
            type: "text",
            text: `weather info: ${JSON.stringify(info)}`,
          },
        ],
      };
    } catch (error: any) {
      throw new Error(`query weather failed: ${error.message}`);
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
