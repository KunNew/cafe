<template>
  <v-app>
    <div style="position: fixed; right: 10px; z-index: 9999">
      <notification
        v-for="notification in $store.state.notifications"
        :key="notification.id"
        :item="notification"
      ></notification>
    </div>
<v-main>
  <Nuxt />
</v-main>
  </v-app>
</template>

<script>
export default {}
</script>

<style scoped></style>
