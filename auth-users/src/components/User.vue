<template>
  <v-card width="500" shaped elevation="17" class="mx-auto mt-9">
    <v-card-title class="justify-center">Sign Up</v-card-title>
    <v-card-subtitle class="justify-center"
      >Register a new user</v-card-subtitle
    >
    <v-form v-model="isValid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.name"
              required
              label="Name"
              :rules="nameRules"
              prepend-icon="perm_identity"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.lastname"
              required
              :rules="lastNameRules"
              label="Lastname"
              prepend-icon="person_outline"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.email"
              required
              :rules="emailRules"
              label="Email"
              prepend-icon="account_circle"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.password"
              required
              :rules="passwordRules"
              label="Password"
              prepend-icon="vpn_key"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="user.initDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="dateRules"
                  v-model="user.initDate"
                  label="Initial Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                :rules="dateRules"
                v-model="user.initDate"
                no-title
                scrollable
                required
              >
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn color="primary" @click="$refs.menu1.save(user.initDate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="user.finalDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="dateRules"
                  v-model="user.finalDate"
                  label="Final Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                :rules="dateRules"
                v-model="user.finalDate"
                no-title
                scrollable
                required
              >
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="menu2 = false">Cancel</v-btn>
                <v-btn color="primary" @click="$refs.menu2.save(user.finalDate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="user.dependency"
              menu-props="auto"
              label="Dependency"
              :items="dependencies"
              item-text="name"
              item-value="id"
              hide-details
              prepend-icon="touch_app"
              :rules="dependencyRules"
              single-line
              required
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-switch
              v-model="user.active"
              label="Active"
              color="success"
              :value="user.active"
              prepend-icon="check_circle"
              hide-details
              required
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn :disabled="!isValid" class="primary" @click="addToUsers"
              >Register</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- Show user has been added! -->
    <v-dialog v-model="dialogUserAdded" max-width="500px">
      <v-card>
        <v-card-title class="headline"> User added successfully!</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogUserAdded = false"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: 0,
        name: "",
        lastname: "",
        email: "",
        password: "",
        initDate: null,
        finalDate: null,
        dependency: "",
        active: false,
      },
      dialogUserAdded: false,
      isValid: true,
      menu1: false,
      menu2: false,
      nameRules: [
        (name) => !!name || "Name is required",
        (name) => name.length >= 3 || "Name must be at least 3 characters",
      ],
      lastNameRules: [
        (lastName) => !!lastName || "Lastname is required",
        (lastName) =>
          lastName.length >= 3 || "Lastname must be at least 3 characters",
      ],
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
      dateRules: [(date) => !!date || "Date is required"],
      dependencyRules: [
        (dependency) => !!dependency || "Dependency is required",
      ],
    };
  },
  computed: {
    dependencies() {
      return this.$store.state.dependencies;
    },
  },
  methods: {
    refresh() {
      this.user = {
        id: 0,
        name: "",
        lastname: "",
        email: "",
        password: "",
        initDate: null,
        finalDate: null,
        dependency: "",
        active: false,
      };
    },
    addToUsers() {
      this.dialogUserAdded = false;
      var CryptoJS = require("crypto-js");
      var ciphertext = CryptoJS.AES.encrypt(
        this.user.password,
        "secret key 123"
      ).toString();
      this.user.password = ciphertext;
      this.$store.dispatch("addToUsers", this.user);
      this.refresh();
      this.dialogUserAdded = true;
    },
  },
};
</script>

<style>
</style>