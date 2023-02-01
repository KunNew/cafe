<template>
  <div>
    <div style="position: fixed; right: 10px; z-index: 9999;">
                <notification v-for="notification in $store.state.notifications" :key="notification.id" :item="notification"></notification>
            </div>
    <Nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
