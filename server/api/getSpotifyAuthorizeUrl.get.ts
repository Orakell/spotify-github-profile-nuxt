export default defineEventHandler((event) => {
  const query = getQuery(event);
  let state: string = query.state?.toString() ?? "";
  if (state.length <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid state',
    });
  }

  try {
    sendRedirect(event, getSpotifyAuthorizationUrl(state));
    return 'ok';
} catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid state',
    });
  }
});

function getSpotifyAuthorizationUrl(state: string) {
  const config = useRuntimeConfig();

  return 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
    client_id: config.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: config.APP_CALLBACK,
    state: state,
    scope: 'user-top-read',
  }).toString();
}