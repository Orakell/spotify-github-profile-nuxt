export default defineEventHandler((event) => {
  const data = $fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}` }
  });
  return data;
})