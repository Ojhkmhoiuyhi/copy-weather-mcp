export async function queryWeather(city: string) {
  try {
    const apiKey = process.env.WEATHER_API_KEY || "";
    if (!apiKey) {
      throw new Error("WEATHER_API_KEY is not set");
    }

    const apiUrl = `http://apis.juhe.cn/simpleWeather/query?city=${city}&key=${apiKey}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`query weather failed with status ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("query weather error:", error);
    throw error;
  }
}
