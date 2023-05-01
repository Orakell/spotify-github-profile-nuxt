<template>
  <div class="container">
    <div class="row">
      <div class="number-col small v-center"># {{ getNumber() }}</div>
      <div class="small">
        <img height=40 width=40 :src="track.image_url" :alt="track.title">
      </div>
      <div class="big songTitle">{{ track.title }} <br> <em>{{ track.author }}</em></div>
      <div class="big v-center">{{ track.album_name }}</div>
      <div class="small v-center">{{ track.duration }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpotifyTrack",
  props: ['track', 'number'],
  methods: {
    getNumber() {
      return this.number + 1;
    }
  }
}
</script>

<style>
.number-col {
  min-width: 35px;
  white-space: nowrap;
}

.v-center {
  align-self: center;
}

.container {
  max-width: 800px;
  background-color: #000;
  color: #b3b3b3;
  font-family: sans-serif;
}

.row {
  display: flex;
  flex-flow: row nowrap;
}

.row>* {
  padding: 5px;
}

.row .small {
  flex: 0 1;
}

.row .big {
  flex: 1 1;
}

.songTitle {
  color: #fff;
}

.songTitle em {
  color: #b3b3b3;
  font-size: 0.8em;
}
</style>