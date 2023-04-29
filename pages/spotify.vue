<template>
  <h2>bjr depuis nuxt v3 et typescript</h2>
  <p>Fetched from : </p><pre>/api/spotify</pre><pre>{{ spotify }}</pre>
</template>

<script setup>
  const { data: spotify } = await useFetch('/api/spotify');
</script>