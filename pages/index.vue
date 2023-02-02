<template>
  <v-container fluid>
    <v-card class="mb-3">
      <v-card-title>
        {{ $t('dashboard') }}
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import constants from '~/helper/constants'

export default {
  name: 'IndexPage',
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route.fullPath);
    console.log(window.location.toString().replace(this.$route.fullPath))
  },
}
</script>
