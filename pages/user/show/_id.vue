<template>
  <v-container fluid>
    <v-card class="mb-3">
      <template v-if="loading">
        <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
      </template>
      <template v-else>
        <v-card-title>{{
          model.first_name + ' ' + model.last_name
        }}</v-card-title>
        <v-card-subtitle>User Detail</v-card-subtitle>
      </template>
    </v-card>
    <v-card>
      <v-card-subtitle>
        <v-btn class="ma-1" outlined color="primary" @click="$router.go(-1)"
          ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
        >
        <v-btn
          class="ma-1"
          color="warning"
          :to="localePath({ name: 'user-id', params: { id: model.id } })"
          ><v-icon left>mdi-pencil-box-outline</v-icon>Edit user</v-btn
        >
      </v-card-subtitle>
      <v-card-text v-if="!loading">
        <v-row>
          <v-col cols="12" md="5" lg="4" xl="3">
            <v-card elevation="0">
              <v-card-subtitle class="text-center">
                <v-avatar size="86" color="grey">
                  <v-img
                    v-if="model.avatar"
                    contain
                    :src="constants.storagePath + model.avatar"
                  ></v-img>
                  <span class="text-h5" v-else>{{
                    model.first_name[0].toUpperCase() +
                    ' ' +
                    model.last_name[0].toUpperCase()
                  }}</span>
                </v-avatar>
                <div class="text-subtitle-2 mt-5">
                  {{ model.first_name + ' ' + model.last_name }}
                </div>
              </v-card-subtitle>
              <v-card-text>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-email-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      model.first_name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>First Name</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-email-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ model.last_name }}</v-list-item-title>
                    <v-list-item-subtitle>Last Name</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-email-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ model.username }}</v-list-item-title>
                    <v-list-item-subtitle>User name</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-email-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ model.email }}</v-list-item-title>
                    <v-list-item-subtitle>Email</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item dense>
                  <v-list-item-icon>
                    <v-icon>mdi-gender-male-female</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      model.gender || 'Male'
                    }}</v-list-item-title>
                    <v-list-item-subtitle>Gender</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="7" lg="8" xl="9"></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import constants from '~/helper/constants'
import axiosApiInstance from '~/utils/utilites'
export default {
  data: () => ({
    loading: true,
    constants: constants,
    model: {},
  }),

  mounted() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      axiosApiInstance
        .get(`user/${this.$route.params.id}`)
        .then((response) => {
          this.model = response.data
        })
        .catch(({ response }) => {
          this.$store.dispatch('pushNotification', {
            message: response.data.message,
            type: 'error',
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
