<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" lazy-validation ref="form">
        <v-text-field
          label="Email"
          prepend-icon="mdi-account-circle"
          v-model="email"
          :rules="emailRules"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="password"
          :rules="passworRule"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success" v-show="false">Register</v-btn>
      <v-spacer></v-spacer>
      <v-progress-circular
        indeterminate
        color="green"
        v-show="loading"
      ></v-progress-circular>
      <v-btn color="info" @click="login" v-show="!loading">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "../../services/api";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      showPassword: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passworRule: [
        (v) => !!v || "Password is required",
        (v) =>
          (!!v && v.length >= 6) || "Password should more than 5 characters",
      ],
      valid: true,
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;
        api
          .login({ email: this.email, password: this.password })
          .then((response) => {
            this.$router.push({ name: "Dashboard" });
            api.getUser().then((res) => {
              console.log(res);
            });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style></style>
