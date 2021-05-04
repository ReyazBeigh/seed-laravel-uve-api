<template>
  <v-card color="green" center>
    This is dashboard, Welcome to {{ username }}
  </v-card>
</template>

<script>
import { authComputed } from "../../store/helper";
export default {
  data() {
    return {};
  },
  computed: {
    ...authComputed,
    username() {
      return this.user ? this.user.name : "";
    },
  },
};
</script>

<style>
</style>
