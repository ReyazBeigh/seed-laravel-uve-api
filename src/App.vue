<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

        <v-tabs v-if="!loggedIn" right>
        <v-tab :to="{ name: 'Home' }"> Home </v-tab>
        <v-tab :to="{ name: 'Login' }" > Login </v-tab>
      </v-tabs>
      <v-tabs  v-if="loggedIn"  right>
        <v-tab :to="{ name: 'Dashboard' }"> Dashboard </v-tab>
        <v-tab v-if="loggedIn" @click="logout"> Logout </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { authComputed } from "./store/helper";
export default {
  name: "App",
  computed: {
    ...authComputed,
  },
  methods: {
    logout() {
      this.$store.commit("UNSET_USER_DATA");
    },
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.$store.commit("SET_USER_DATA", user);
      //this.$router.push({name:'Dashboard'})
    }
  },
  components: {},

  data: () => ({
    //
  }),
};
</script>
