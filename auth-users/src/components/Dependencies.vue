<template>
  <v-card width="1000" shaped elevation="17" class="mx-auto mt-9">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">Coordinator</th>
            <th class="text-center">Location</th>
            <th class="text-center">Active</th>
            <th class="text-center">Max users</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dependencies" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.coordinator }}</td>
            <td>{{ item.location }}</td>
            <td>
              <v-icon :color="item.active ? 'green darken-2' : 'red'">{{
                item.active ? "verified" : "unpublished"
              }}</v-icon>
            </td>
            <td>{{ item.amountUsers }}</td>
            <td>
              <v-icon small @click="viewDependency(item)">visibility</v-icon>
              <v-icon small @click="viewEdit(item)">edit</v-icon>
              <v-icon small @click="viewDelete(item)">delete</v-icon>
            </td>
          </tr>
        </tbody>
        <!-- Dialog to show dependency details-->
        <v-dialog v-model="dialogDetails" max-width="500px">
          <v-card>
            <v-card-title class="headline justify-center"
              >Details of {{ itemView.name }}</v-card-title
            >
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Name"
                      :value="itemView.name"
                      disabled
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Coordinator"
                      :value="itemView.coordinator"
                      disabled
                      prepend-icon="record_voice_over"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      required
                      label="Location"
                      :value="itemView.location"
                      disabled
                      prepend-icon="location_on"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="text--disabled">Activation</p>
                    <v-icon
                      :color="itemView.active ? 'green darken-2' : 'red'"
                      >{{
                        itemView.active ? "verified" : "unpublished"
                      }}</v-icon
                    >
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-subheader>Max Users: </v-subheader>
                    <v-text-field
                      required
                      :value="itemView.amountUsers"
                      disabled
                      prepend-icon="groups"
                    />
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="6">
                    <v-btn
                      color="blue darken-1"
                      @click="dialogUsers = true"
                      text
                      >View Users</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="dialogDetails = false" text
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Dialod edit dependency -->
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title class="headline justify-center"
              >Edit a dependency</v-card-title
            >
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemEdit.name"
                      :value="itemEdit.name"
                      required
                      :rules="nameRules"
                      label="Name"
                      prepend-icon="perm_identity"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemEdit.coordinator"
                      :value="itemEdit.coordinator"
                      required
                      :rules="coordinatorRules"
                      label="Coordinator"
                      prepend-icon="record_voice_over"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="itemEdit.location"
                      :value="itemEdit.location"
                      required
                      :rules="locationRules"
                      label="Location"
                      prepend-icon="location_on"
                    />
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

                <v-row>
                  <v-col cols="12" md="6">
                    <v-subheader>Max Users</v-subheader>
                    <v-slider
                      v-model="itemEdit.amountUsers"
                      max="200"
                      :value="itemEdit.amountUsers"
                      prepend-icon="add_circle_outline"
                      :rules="usersRules"
                      thumb-label
                    ></v-slider>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                @click="editDependency(itemEdit)"
                text
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

        <!-- Dialog to show users -->
        <v-dialog v-model="dialogUsers" max-width="1200px">
          <v-card>
            <v-card-title class="headline"
              >Users
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="dialogUsers = false">OK</v-btn>
            </v-card-title>
            <v-simple-table height="300px">
              <thead>
                <tr>
                  <th class="text-center">Name</th>
                  <th class="text-center">Lastname</th>
                  <th class="text-center">Email</th>
                  <th class="text-center">Initial Date</th>
                  <th class="text-center">Final Date</th>
                  <th class="text-center">Active</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in itemView.users" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.lastname }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.initDate }}</td>
                  <td>{{ item.finalDate }}</td>
                  <td>
                    <v-icon :color="item.active ? 'green darken-2' : 'red'">{{
                      item.active ? "how_to_reg" : "unpublished"
                    }}</v-icon>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-dialog>

        <!-- Dialog to show warning Delete Dependency-->
        <v-dialog v-model="dialogDeleteDependency" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogDeleteDependency = false"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click="deleteDependency(itemDelete)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Show error when a dependency has users. -->
        <v-dialog v-model="dialogErrorDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              Error: Could not delete. Dependency has associated
              users.</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogErrorDelete = false"
                >OK</v-btn
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
      itemEdit: Object,
      itemDelete: Object,
      search: "",
      dialogDetails: false,
      dialogUsers: false,
      dialogEdit: false,
      dialogSuccess: false,
      dialogDeleteDependency: false,
      dialogErrorDelete: false,
    };
  },
  methods: {
    editDependency(item) {
      this.dialogEdit = false;
      this.$store.dispatch("editDependency", item);
      this.dialogSuccess = true;
    },
    deleteDependency(item) {
      if (item.users.length <= 0) {
        this.dialogDeleteDependency = false;
        this.$store.dispatch("deleteDependency", item);
        this.dialogSuccess = true;
      } else {
        this.dialogDeleteDependency = false;
        this.dialogErrorDelete = true;
      }
    },
    viewDependency(item) {
      this.itemView = item;
      this.dialogDetails = true;
    },
    viewItemConfirm() {
      this.dialogDetails = false;
    },
    viewEdit(item) {
      this.dialogEdit = true;
      this.itemEdit = Object.assign({}, item);
    },
    viewDelete(item) {
      this.dialogDeleteDependency = true;
      this.itemDelete = Object.assign({}, item);
    },
  },
  computed: {
    dependencies() {
      return this.$store.state.dependencies;
    },
  },
};
</script>

<style>
</style>