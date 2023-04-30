<template>
  <div></div>
</template>

<script setup>
  const state = generateCodeVerifier(16);
  const cookie = useCookie('spotify_state');
  cookie.value = state;
  await navigateTo('/api/getSpotifyAuthorizeUrl?state=' + state);
</script>