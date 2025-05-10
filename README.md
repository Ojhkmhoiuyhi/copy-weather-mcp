# weather-mcp

mcp server for querying weather

## Usage

```json
{
  "mcpServers": {
    "weather-mcp": {
      "command": "npx",
      "args": ["-y", "@chatmcp/weather-mcp"],
      "env": {
        "WEATHER_API_KEY": "xxx"
      }
    }
  }
}
```
