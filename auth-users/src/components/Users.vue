<template>
  <v-card width="1300" shaped elevation="17" class="mx-auto mt-9">
    <v-card-title>
      <v-select
        v-model="filter"
        :items="items"
        attach
        chips
        label="Filter by: "
      >
        <template v-slot:selection="data">
          <v-chip
            :key="JSON.stringify(data.item)"
            v-bind="data.attrs"
            :input-value="data.selected"
            :disabled="data.disabled"
            @click:close="data.parent.selectItem(data.item)"
          >
            <v-avatar
              class="accent white--text"
              left
              v-text="data.item.slice(0, 1).toUpperCase()"
            ></v-avatar>
            {{ data.item }}
          </v-chip>
        </template>
      </v-select>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Search" single-line hide-details>
      </v-text-field>
      <v-icon @click="searchUsers()">search</v-icon>
    </v-card-title>
    <v-simple-table height="350px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">Lastname</th>
            <th class="text-center">Email</th>
            <th class="text-center">Initial Date</th>
            <th class="text-center">Final Date</th>
            <th class="text-center">Dependency</th>
            <th class="text-center">Active</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.initDate }}</td>
            <td>{{ item.finalDate }}</td>
            <td>
              {{ dependencies.find((dep) => dep.id === item.dependency).name }}
            </td>
            <td>
              <v-icon :color="item.active ? 'green darken-2' : 'red'">{{
                item.active ? "how_to_reg" : "unpublished"
              }}</v-icon>
            </td>
            <td>
              <v-icon small @click="viewUser(item)">visibility</v-icon>
              <v-icon small @click="viewEdit(item)">edit</v-icon>
              <v-icon small @click="getUserDelete(item)">delete</v-icon>
            </td>
          </tr>
        </tbody>
        <!-- Dialog to show user details-->
        <v-dialog v-model="dialogDetails" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Details of {{ itemView.name }}</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="viewItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialog to show warning -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteUsers(itemDelete)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Dialog to edit a user -->
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card shaped elevation="17">
            <v-card-title class="headline justify-center"
              >Edit an user</v-card-title
            >
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemEdit.name"
                      required
                      label="Name"
                      :rules="nameRules"
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemEdit.lastname"
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
                      v-model="itemEdit.email"
                      required
                      :rules="emailRules"
                      label="Email"
                      prepend-icon="account_circle"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemEdit.password"
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
                      :return-value.sync="itemEdit.initDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :rules="dateRules"
                          v-model="itemEdit.initDate"
                          label="Initial Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :rules="dateRules"
                        v-model="itemEdit.initDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="menu1 = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="primary"
                          @click="$refs.menu1.save(itemEdit.initDate)"
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
                      :return-value.sync="itemEdit.finalDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :rules="dateRules"
                          v-model="itemEdit.finalDate"
                          label="Final Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :rules="dateRules"
                        v-model="itemEdit.finalDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="menu2 = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="primary"
                          @click="$refs.menu2.save(itemEdit.finalDate)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="itemEdit.dependency"
                      menu-props="auto"
                      label="Dependency"
                      :items="dependencies"
                      item-text="name"
                      item-value="id"
                      hide-details
                      prepend-icon="touch_app"
                      :rules="dependencyRules"
                      single-line
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-switch
                      v-model="itemEdit.active"
                      label="Active"
                      color="success"
                      :value="itemEdit.active"
                      prepend-icon="check_circle"
                      hide-details
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="editUsers(itemEdit)" text
                >Update</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialog to show success change! -->
        <v-dialog v-model="dialogSuccess" max-width="500px">
          <v-card>
            <v-card-title class="headline">Successful operation!</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogSuccess = false"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialog to show error on search -->
        <v-dialog v-model="dialogError" max-width="500px">
          <v-card>
            <v-card-title class="headline justify-center"
              >An error has occurred. Check the filter!</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogError = false"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialog to show results from search! -->
        <v-dialog v-model="dialogSearch" max-width="1200px">
          <v-card>
            <v-card-title class="headline justify-center"
              >Results table!</v-card-title
            >

            <v-simple-table height="350px">
              <thead>
                <tr>
                  <th class="text-center">Name</th>
                  <th class="text-center">Lastname</th>
                  <th class="text-center">Email</th>
                  <th class="text-center">Initial Date</th>
                  <th class="text-center">Final Date</th>
                  <th class="text-center">Dependency</th>
                  <th class="text-center">Active</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in results" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.lastname }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.initDate }}</td>
                  <td>{{ item.finalDate }}</td>
                  <td>
                    {{
                      dependencies.find((dep) => dep.id === item.dependency)
                        .name
                    }}
                  </td>
                  <td>
                    <v-icon :color="item.active ? 'green darken-2' : 'red'">{{
                      item.active ? "how_to_reg" : "unpublished"
                    }}</v-icon>
                  </td>
                </tr>
              </tbody></v-simple-table
            >

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogSearch = false"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-simple-table>
    <!-- Loader -->
    <v-dialog v-model="dialogLoader" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by. Looking in the database.
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Dialog to show not founds results -->
    <v-dialog v-model="dialogEmptyResults" max-width="500px">
      <v-card>
        <v-card-title class="headline justify-center"
          >No results found.</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEmptyResults = false"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
//import { db } from "../main";
export default {
  data() {
    return {
      items: ["name", "dependency"],
      itemView: Object,
      filter: "",
      search: "",
      results: [],
      dialogLoader: false,
      dialogDelete: false,
      dialogDetails: false,
      dialogEdit: false,
      dialogSuccess: false,
      dialogError: false,
      dialogSearch: false,
      dialogEmptyResults: false,
      itemDelete: Object,
      itemEdit: Object,
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
  watch: {
    dialogLoader(val) {
      if (!val) return;

      setTimeout(() => (this.dialogLoader = false), 4000);
    },
  },
  methods: {
    closeDelete() {
      this.dialogDelete = false;
    },
    viewUser(item) {
      this.itemView = item;
      this.dialogDetails = true;
    },
    viewItemConfirm() {
      this.dialogDetails = false;
    },
    getUserDelete(item) {
      this.itemDelete = item;
      this.dialogDelete = true;
    },
    deleteUsers(payload) {
      this.$store.dispatch("deleteUsers", payload);
      this.dialogDelete = false;
      this.dialogSuccess = true;
    },
    viewEdit(item) {
      this.dialogEdit = true;
      this.itemEdit = Object.assign({}, item);
      var CryptoJS = require("crypto-js");
      var bytes = CryptoJS.AES.decrypt(
        this.itemEdit.password,
        "secret key 123"
      );
      var originaltext = bytes.toString(CryptoJS.enc.Utf8);
      this.itemEdit.password = originaltext;
    },
    editUsers(payload) {
      this.dialogEdit = false;
      var CryptoJS = require("crypto-js");
      var ciphertext = CryptoJS.AES.encrypt(
        payload.password,
        "secret key 123"
      ).toString();
      payload.password = ciphertext;
      this.$store.dispatch("editUsers", payload);
      this.dialogSuccess = true;
    },
    searchUsers() {
      this.results = [];
      this.dialogEmptyResults = false;
      this.dialogError = false;
      this.dialogSearch = false;

      if (this.filter === "name") {
        this.$store.state.users.forEach((up) => {
          if (up.name === this.search) {
            this.results.push(up);
          }
        });
        if (this.results.length <= 0) {
          this.dialogEmptyResults = true;
        } else {
          this.dialogSearch = true;
        }
      } else if (this.filter === "dependency") {
        this.$store.state.dependencies.forEach((up) => {
          if (up.name === this.search) {
            this.results = up.users;
          }
        });
        if (this.results.length <= 0) {
          this.dialogEmptyResults = true;
        } else {
          this.dialogSearch = true;
        }
      } else if (this.filter === "") {
        this.dialogError = true;
      }
    },
  },

  computed: {
    users() {
      return this.$store.state.users;
    },
    dependencies() {
      return this.$store.state.dependencies;
    },
  },
};
</script>

<style>
</style>