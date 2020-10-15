<template>
  <v-card width="1300" shaped elevation="17" class="mx-auto mt-9">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
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
            <td>{{ item.dependency }}</td>
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
              >Edit to {{ itemEdit.name }}</v-card-title
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
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      itemView: Object,
      search: "",
      dialogDelete: false,
      dialogDetails: false,
      dialogEdit: false,
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
    },
    viewEdit(item) {
      this.dialogEdit = true;
      this.itemEdit = Object.assign({}, item);
    },
    editUsers(payload) {
      this.$store.dispatch("editUsers", payload);
      this.dialogEdit = false;
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