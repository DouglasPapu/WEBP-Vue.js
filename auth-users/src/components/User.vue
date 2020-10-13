<template>
 <v-card width="500" shaped elevation="17" class="mx-auto mt-9">
     <v-card-title class="justify-center">Sign Up</v-card-title>
     <v-card-subtitle class="justify-center">Register a new user</v-card-subtitle>
 <v-form v-model="valid">
  <v-container>
      <v-row>
          <v-col cols="12" md="6">
              <v-text-field required label="Name" :rules="nameRules" prepend-icon="perm_identity"/>
          </v-col>
          <v-col cols="12" md="6">
              <v-text-field required :rules="lastNameRules" label="Lastname" prepend-icon="person_outline"/>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
              <v-text-field required :rules="emailRules" label="Email" prepend-icon="account_circle"/>
          </v-col>
          <v-col cols="12" md="6">
              <v-text-field required :rules="passwordRules" label="Password" prepend-icon="vpn_key"/>
          </v-col>
      </v-row>
        <v-row>
         <v-col cols="12" md="6">
    <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="initDate"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :rules="dateRules"
            v-model="initDate"
            label="Initial Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker :rules="dateRules" v-model="initDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu1.save(initDate)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>

  <v-col cols="12" md="6">
     <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="finalDate"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :rules="dateRules"
            v-model="finalDate"
            label="Final Date"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker :rules="dateRules" v-model="finalDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu2.save(finalDate)">OK</v-btn>
        </v-date-picker>
      </v-menu>
        </v-col>
      </v-row>

    <v-row>
        <v-col cols="12" md="6">
            <v-select
          v-model="e1"
          :items="dependencies"
          menu-props="auto"
          label="Dependency"
          hide-details
          prepend-icon="touch_app"
          :rules="dependencyRules"
          single-line
        ></v-select>
        </v-col>

        <v-col cols="12" md="6">
            <v-switch
              v-model="ex11"
              label="Active"
              color="success"
              value="success"
              prepend-icon="check_circle"
              hide-details
            ></v-switch>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn class="primary">Resgiter</v-btn>
        </v-col>
    </v-row>
  </v-container>
 </v-form>
  </v-card>
</template>

<script>
export default {
 data(){
     return {
         menu1: false,
         menu2: false,
         initDate: null,
         finalDate: null,
         nameRules: [
             (name) => !!name || "Name is required",
             (name) => name.length >= 3 || "Name must be at least 3 characters"
         ],
          lastNameRules: [
             (lastName) => !!lastName || "Lastname is required",
             (lastName) => lastName.length >= 3 || "Lastname must be at least 3 characters"
         ],
         emailRules: [
             (email) => !!email || "Email is required.",
             (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Email is invalid",
       ],
         passwordRules: [
            (password) => !!password || "Password is required",
            (password) => password.length >= 8 || "Password must be at least 8 characters"
       ],
         dateRules: [
           (date) => !!date || "Date is required",
       ],
         dependencyRules: [
           (dependency) => !!dependency || "Dependency is required",
       ],

     }
 }
}
</script>

<style>

</style>