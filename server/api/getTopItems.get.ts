import { getTopTracks, transformTopTracksData } from "~/composables/spotify";

export default defineEventHandler(async (event) => {
  let tracks = await getTopTracks();

  return transformTopTracksData(tracks);
});