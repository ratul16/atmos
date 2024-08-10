export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = config.private.cityUrl;

  try {
    const response = await fetch(url);

    // Check if the response is OK
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: { message: response.statusText },
      };
    }

    // Check the content-type header
    const contentType = response.headers.get('content-type');

    // Parse and return the JSON data
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      statusCode: 500,
      body: { message: error.message },
    };
  }
});
