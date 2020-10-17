<template>
  <div>
    <v-main wrap>
      <v-card width="500" shaped elevation="17" flat class="mx-auto mt-9">
        <v-card-title class="justify-center">Join Free</v-card-title>
        <v-card-subtitle class="justify-center">welcome</v-card-subtitle>
        <v-form v-model="isValid">
          <v-card-text>
            <v-text-field
              required
              v-model="itemUser.email"
              label="Email"
              :rules="emailRules"
              prepend-icon="account_circle"
            />
            <v-text-field
              label="Password"
              v-model="itemUser.password"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="lock"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              @click:append="showPassword = !showPassword"
              :rules="passwordRules"
              required
            />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn color="primary" :disabled="!isValid" @click="verifyLogin()"
              ><v-icon left>login</v-icon>Login</v-btn
            >
          </v-card-actions>
          <v-card-actions class="justify-center">
            <v-btn to="/user" text>Register</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <!-- Loader -->
      <v-dialog v-model="dialogLoader" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Please stand by. Looking for you in the database.
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Show if exist user in the BD FireBase -->
      <v-dialog
        v-if="!dialogLoader"
        v-model="dialogLogin"
        :loading="dialogLogin"
        max-width="500px"
      >
        <v-card>
          <v-card-title v-if="isUser" class="headline"
            >Congratulations! You exist in the database
          </v-card-title>
          <v-card-title v-else class="headline"
            >Incorrect email and / or password.
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="refresh()">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  data() {
    return {
      dialogLogin: false,
      dialogErrorEmail: false,
      dialogErrorPassword: false,
      dialogLoader: false,
      showPassword: false,
      isValid: true,
      itemUser: {
        email: "",
        password: "",
      },
      isUser: false,
      emailRules: [
        (email) => !!email || "Email is required.",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Email is invalid",
      ],
      passwordRules: [
        (password) => !!password || "Password is required",
        (password) =>
          password.length >= 8 || "Password must be at least 8 characters",
      ],
    };
  },
  watch: {
    dialogLoader(val) {
      if (!val) return;

      setTimeout(() => (this.dialogLoader = false), 3000);
    },
  },
  methods: {
    verifyLogin() {
      this.dialogLoader = true;
      this.isUser = false;
      db.collection("users")
        .get()
        .then((up) => {
          up.forEach((doc) => {
            var CryptoJS = require("crypto-js");
            var bytes = CryptoJS.AES.decrypt(
              doc.data().password,
              "secret key 123"
            );
            var originaltext = bytes.toString(CryptoJS.enc.Utf8);
            if (
              doc.data().email === this.itemUser.email &&
              originaltext === this.itemUser.password
            ) {
              this.isUser = true;
            }
          });
        });

      this.dialogLogin = true;
    },
    refresh() {
      this.isUser = false;
      this.dialogLogin = false;
    },
  },
};
</script>

<style>
.home-bg {
  background-image: url("https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
</style>