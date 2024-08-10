export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = config.private.cityUrl;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        status: response.status,
        message: response.statusText || 'Failed to fetch data',
        data: [],
      };
    }

    const data = await response.json();
    return {
      status: 200,
      message: 'City List fetched successfully',
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message || 'Internal Server Error',
      data: [],
    };
  }
});
