<template>
  <h2>bjr depuis nuxt v3 et typescript</h2>
  <pre>GET https://api.spotify.com/v1/me/top/tracks</pre>
  <code><pre>{{ spotify }}</pre></code>
</template>

<script setup>
const { data: spotify } = await useFetch('/api/getTopItems');
</script>