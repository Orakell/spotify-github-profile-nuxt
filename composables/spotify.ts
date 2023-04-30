export const generateCodeVerifier = (length: number) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const getAccessToken = async () => {
  const config = useRuntimeConfig();

  return config.SPOTIFY_ACCESS_TOKEN;

  const data = await $fetch(
    'https://accounts.spotify.com/api/token',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        code: config.SPOTIFY_API_CODE,
        redirect_uri: config.APP_CALLBACK,
        grant_type: 'authorization_code',
        client_id: config.SPOTIFY_CLIENT_ID,
        client_secreft: config.SPOTIFY_SECRET_ID,
      }
    });

  console.log(data);
}