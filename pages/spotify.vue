<template>
  <div id="top-tracks" class="tracks-container">
    <div class="title">
      My last month's top tracks on
      <img src="~/assets/spotify-logo.png" alt="spotify logo" />
    </div>
    <SpotifyTrack
      v-for="(track, index) in topTracks"
      :track="track"
      :key="index"
      :number="index"
    />
  </div>
</template>

<script setup>
import SpotifyTrack from "~/component/SpotifyTrack.vue";

const { data: topTracks } = await useFetch("/api/getTopItems");
</script>

<style>
.title {
  color: #1db954;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tracks-container {
  background-color: #000;
  width: fit-content;
  padding: 15px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>