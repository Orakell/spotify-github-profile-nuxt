import base64 from "~/plugins/base64";

export const generateCodeVerifier = (length: number) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const getAccessToken = async () => {
  const config = useRuntimeConfig();

  return config.SPOTIFY_ACCESS_TOKEN;

  const data = await $fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: {
      code: config.SPOTIFY_API_CODE,
      redirect_uri: config.APP_CALLBACK,
      grant_type: "authorization_code",
      client_id: config.SPOTIFY_CLIENT_ID,
      client_secreft: config.SPOTIFY_SECRET_ID,
    },
  });

  console.log(data);
};

export const getTopTracks = async () => {
  const config = useRuntimeConfig();
  let dataA = JSON.parse(config.SPOTIFY_TEMP_DATA);

  dataA.items = dataA.items.slice(0, 5);

  return dataA;

  const data = await $fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
    {
      headers: {
        Authorization: `Bearer ${config.SPOTIFY_ACCESS_TOKEN}`,
      },
    }
  );

  return data;
};

export const transformTopTracksData = async (data: Object) => {
  let transformedData: Array<Object> = [];

  for (const element of data.items) {
    let track = {
      id: element.id,
      title: element.name,
      author: element.artists.map((artist) => artist.name).join(", "),
      image_url: element.album.images[2].url,
      image_b64: await getBase64Image(element.album.images[2].url),
      duration: millisToMinutesAndSeconds(element.duration_ms),
      album_name: element.album.name,
    };

    transformedData.push(track);
  }

  return transformedData;
};

async function getBase64Image(img) {
  let blob: Blob = await $fetch(img);

  return (
    "data:image/png;base64," +
    Buffer.from(await blob.text()).toString("base64")
  );
}

function millisToMinutesAndSeconds(millis: number) {
  var minutes: number = Math.floor(millis / 60000);
  var seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
