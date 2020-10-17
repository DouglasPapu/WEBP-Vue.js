<template>
  <v-card width="500" shaped elevation="17" class="mx-auto mt-9">
    <v-card-title class="justify-center">Sign Up</v-card-title>
    <v-card-subtitle class="justify-center"
      >Register a new dependecy</v-card-subtitle
    >
    <v-form v-model="isValid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="dependency.name"
              :value="dependency.name"
              required
              :rules="nameRules"
              label="Name"
              prepend-icon="perm_identity"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="dependency.coordinator"
              :value="dependency.coordinator"
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
              v-model="dependency.location"
              required
              :rules="locationRules"
              label="Location"
              prepend-icon="location_on"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-switch
              v-model="dependency.active"
              label="Active"
              color="success"
              :value="dependency.active"
              prepend-icon="check_circle"
              hide-details
              required
            ></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-subheader>Max Users</v-subheader>
            <v-slider
              v-model="dependency.amountUsers"
              max="200"
              :value="dependency.amountUsers"
              prepend-icon="add_circle_outline"
              :rules="usersRules"
              thumb-label
              required
            ></v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :disabled="!isValid"
              class="primary"
              @click="addToDependencies"
              >Resgiter</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- Show user has been added! -->
    <v-dialog v-model="dialogDependencyAdded" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          Dependency added successfully!</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogDependencyAdded = false"
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
      dependency: {
        id: 0,
        name: "",
        users: [],
        coordinator: "",
        location: "",
        active: "",
        amountUsers: 0,
      },
      dialogDependencyAdded: false,
      isValid: true,
      dialog: false,
      nameRules: [
        (name) => !!name || "Name is required",
        (name) => name.length >= 3 || "Name must be at least 3 characters",
      ],
      coordinatorRules: [
        (coordinator) => !!coordinator || "Coordinator is required",
        (coordinator) =>
          coordinator.length >= 3 ||
          "Coordinator must be at least 3 characters",
      ],
      locationRules: [(location) => !!location || "location is required"],
      usersRules: [
        (user) => !!user || "Users are required. Must be at least 1",
      ],
    };
  },
  methods: {
    refresh() {
      this.dependency = {
        id: 0,
        name: "",
        coordinator: "",
        location: "",
        active: "",
        amountUsers: 0,
      };
    },
    addToDependencies() {
      this.dialogDependencyAdded = false;
      this.$store.dispatch("addToDependencies", this.dependency);
      this.refresh();
      this.dialogDependencyAdded = true;
    },
  },
};
</script>

<style>
</style>