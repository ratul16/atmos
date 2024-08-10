import { getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);
  const config = useRuntimeConfig();
  const apiKey = config.private.openWeatherApiKey;

  const apiUrl = `https://api.openweathermap.org/data/2.5/${query}&units=metric&appid=${apiKey}`;
  // console.log(apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: { message: response.statusText },
      };
    }
    const data = await response.json();
    return {
      status: 200,
      message: 'Weather fetched successfully',
      data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    };
  }
});
