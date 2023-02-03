<template>
  <v-container fluid>
    <v-card class="mb-3">
      <template v-if="loading">
        <v-skeleton-loader type="card-heading"></v-skeleton-loader>
        <v-skeleton-loader class="px-4 pb-3" type="text"></v-skeleton-loader>
      </template>
      <template v-else>
        <v-card-title>Product</v-card-title>
        <v-card-subtitle>Product/Edit.</v-card-subtitle>
      </template>
    </v-card>
    <v-form
      lazy-validation
      ref="form"
      @submit.prevent="onSubmit"
      :disabled="form.submitting"
    >
      <v-card>
        <v-card-subtitle>
          <v-btn class="ma-1" outlined color="primary" @click="$router.go(-1)"
            ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
          >
        </v-card-subtitle>
        <v-card-subtitle class="mb-3"
          >Fill the form bellow to create new product</v-card-subtitle
        >
        <v-card-text>
          <v-row>
            <v-col class="py-0" cols="12">
              <v-list-item class="px-0 mb-5">
                <v-list-item-avatar size="128" tile color="grey">
                  <v-img
                    v-if="!form.data.avatar"
                    :src="constants.storagePath + form.additional.avatar"
                    contain
                  ></v-img>
                  <v-img v-else :src="form.additional.avatar" contain></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-file-input
                    v-model="form.data.avatar"
                    @change="onInputFile"
                    show-size
                    prepend-icon=""
                    prepend-inner-icon="mdi-image"
                    accept="image/*"
                    outlined
                    label="Avatar"
                  >
                  </v-file-input>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
              <v-text-field
                v-model="form.data.name"
                required
                :rules="[(v) => !!v || 'Name is required']"
                outlined
                label="First Name"
              >
              </v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
              <v-text-field
                v-model="form.data.price"
                required
                :rules="[(v) => !!v || 'Price is required']"
                outlined
                label="Price"
              >
              </v-text-field>
            </v-col>
            <v-col class="py-0" cols="12">
              <v-text-field
                v-model="form.data.description"
                required
                :rules="[(v) => !!v || 'Description is required']"
                outlined
                label="Description"
              >
              </v-text-field>
            </v-col>


            <v-col class="py-0" cols="12">
              <v-autocomplete
                v-model="form.data.category_id"
                :items="categories"
                item-text="name"
                item-value="id"
                required
                :rules="[(v) => !!v || 'Category is required']"
                outlined
                label="Category"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn type="submit" color="success" :loading="form.submitting"
            ><v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Save</v-btn
          >
          <v-btn color="secondary" @click="$router.go(-1)"
            ><v-icon left>mdi-cancel</v-icon>Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
import constants from '../../helper/constants'
import axiosApiInstance from '../../utils/utilites'
export default {
  data: () => ({
    loading: true,
    current_date: null,
    constants: constants,
    form: {
      model: {},
      submitting: false,
      data: {
        name: null,
        price: null,
        description: null,
        category_id: null,
        avatar: null,
      },
      additional: {
        avatar: null,
      },
    },
    categories: []
  }),

  mounted() {
    this.fetchData()
    this.fetchCategory()
  },

  methods: {
    fetchCategory() {
      axiosApiInstance
        .get(`/category`)
        .then((response) => {
          this.categories = response.data?.data
        })
        .catch((response) => {
          this.$store.dispatch('pushNotification', {
            message: response.data.message,
            type: 'error',
          })
        })
    },
    fetchData() {
      axiosApiInstance
        .get(`product/${this.$route.params.id}/edit`)
        .then((response) => {
          this.form = response.data
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
    onInputFile(e) {
      if (e) this.form.additional.avatar = URL.createObjectURL(e)
      else this.form.additional.avatar = null
    },

    onSubmit() {
      if (this.$refs.form.validate()) {
        this.form.submitting = true
        let formData = new FormData()
        formData.append('_method', 'PUT')
        if (this.form.data.avatar)
          formData.append('avatar', this.form.data.avatar)
          formData.append('name', this.form.data.name)
        formData.append('price', this.form.data.price)
        formData.append('category_id', this.form.data.category_id)
        formData.append('description', this.form.data.description)
        axiosApiInstance
          .post(`product/${this.$route.params.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((response) => {
            this.$store.dispatch('pushNotification', {
              message: response.data.message,
              type: 'success',
            })
            this.$router.go(-1)
          })
          .catch(({ response }) => {
            this.$store.dispatch('pushNotification', {
              message: response.data.message,
              type: 'error',
            })
          })
          .finally(() => {
            this.form.submitting = false
          })
      }
    },

    // keyDown(e)
    // {
    //     var charCode = e.keyCode
    //     console.log(e)
    //     if (charCode < 8 || charCode > 9 && charCode < 16 || charCode > 20 && charCode < 33 || charCode > 40 && charCode < 45 || charCode == 47 || charCode > 57 && charCode < 61 || charCode > 61 && charCode < 91 || charCode > 91) e.preventDefault();
    // }
  },
}
</script>
