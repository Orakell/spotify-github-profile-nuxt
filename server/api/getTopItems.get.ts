export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const data = await $fetch(
    'https://api.spotify.com/v1/me/top/tracks?time_range=short_term',
    {
      headers: {
        Authorization: `Bearer ${config.SPOTIFY_ACCESS_TOKEN}`,
      }
    }
  );

  return data;
});