<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      dark
    >
      <v-list shaped>
        <v-list-item :to="localePath('/')" exact>
          <v-list-item-icon>
            <v-icon color="info">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashbaord</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader>User Management</v-subheader>
        <v-list-item :to="localePath('user')">
          <v-list-item-icon>
            <v-icon color="info">mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="localePath('category')">
          <v-list-item-icon>
            <v-icon color="info">mdi-shape-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Category</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="localePath('product')">
          <v-list-item-icon>
            <v-icon color="info">mdi-ferry</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Product</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />

      <v-menu open-on-hover offset-y offset-overflow>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar tile v-on="on" v-bind="attrs" class="mr-5">
            <v-img
              contain
              :src="require(`~/assets/${$i18n.locale}.png`)"
              alt=""
            />
            <!-- <v-img contain :src="storagePath + 'lang/' + $i18n.locale + '.png'"></v-img> -->
          </v-avatar>
        </template>
        <v-list dense>
          <v-list-item @click="changeLanguage('km')">
            <v-list-item-avatar tile>
              <v-img contain :src="require('~/assets/km.png')"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Km</v-list-item-title>
              <v-list-item-subtitle>ភាសាខ្មែរ</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="changeLanguage('en')">
            <v-list-item-avatar tile>
              <v-img contain :src="require('~/assets/en.png')"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>En</v-list-item-title>
              <v-list-item-subtitle>English</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y transition="slide-y-transition" v-if="user">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-2" icon v-bind="attrs" v-on="on">
            <v-avatar color="primary" v-if="user.avatar">
              <v-img :src="storagePath + user.avatar"></v-img>
            </v-avatar>
            <v-avatar color="primary" v-else>{{
              user.first_name[0] + user.last_name[0]
            }}</v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar class="white--text">
                <v-avatar color="primary" v-if="user.avatar">
                  <v-img :src="storagePath + user.avatar"></v-img>
                </v-avatar>
                <v-avatar color="primary" v-else>
                  {{ user.first_name[0] + user.last_name[0] }}
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{
                  user.first_name + ' ' + user.last_name
                }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item link dense to="/setting">
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Setting</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link dense @click="logout()">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <div style="position: fixed; right: 10px; z-index: 9999">
        <notification
          v-for="notification in $store.state.notifications"
          :key="notification.id"
          :item="notification"
        ></notification>
      </div>
      <transition name="slide-x-transition" mode="out-in">
        <Nuxt />
      </transition>
    </v-main>

    <v-footer padless>
      <v-card flat tile width="100%" dark class="text-center">
        <v-card-text class="white--text"
          >{{ new Date().getFullYear() }} —<strong
            >Made by Code4You</strong
          ></v-card-text
        >
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import constants from '~/helper/constants'
export default {
  middleware: 'auth',
  name: 'DefaultLayout',
  data() {
    return {
      storagePath: constants.storagePath,
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Nuxt-SSR',
    }
  },
  computed: {
    ...mapGetters('auth', {
      user: 'user',
    }),
  },
  methods: {
    changeLanguage(locale) {
      this.$router.replace(this.switchLocalePath(locale))
    },
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
  beforeCreate() {
    this.$store.commit('auth/SET_REFRESHING', false)
    this.$store.dispatch('auth/getUser').catch((err) => {})
  },
}
</script>
