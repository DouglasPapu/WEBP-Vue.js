<template>
 <v-card width="500" shaped elevation="17" class="mx-auto mt-9">
     <v-card-title class="justify-center">Sign Up</v-card-title>
     <v-card-subtitle class="justify-center">Register a new user</v-card-subtitle>
 <v-form v-model="valid">
  <v-container>
      <v-row>
          <v-col cols="12" md="6">
              <v-text-field required label="Name" prepend-icon="perm_identity"/>
          </v-col>
          <v-col cols="12" md="6">
              <v-text-field required label="Lastname" prepend-icon="person_outline"/>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="12" md="6">
              <v-text-field required label="Email" prepend-icon="account_circle"/>
          </v-col>
          <v-col cols="12" md="6">
              <v-text-field required label="Password" prepend-icon="vpn_key"/>
          </v-col>
      </v-row>
        <v-row>
         <v-col cols="12" md="6">
             <v-dialog  ref="dialog" v-model="date1" :return-value.sync="dateInit" persistent width="290px" >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field  v-model="dateInit" label="Init Date"  prepend-icon="book_online"  readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker  v-model="dateInit" scrollable locale="es-419" >
                <v-spacer></v-spacer>
                <v-btn  text color="primary" @click="modal1 = false">
                        Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(dateInit)" >
                OK
                </v-btn>
                </v-date-picker>
            </v-dialog>
         </v-col>

        <v-col cols="12" md="6">
            <v-dialog  ref="dialog" v-model="date1" :return-value.sync="dateInit" persistent width="290px" >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field  v-model="dateInit" label="Final Date"  prepend-icon="book_online"  readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker  v-model="dateInit" scrollable locale="es-419" >
                <v-spacer></v-spacer>
                <v-btn  text color="primary" @click="modal1 = false">
                        Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(dateInit)" >
                OK
                </v-btn>
                </v-date-picker>
            </v-dialog>
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

}
</script>

<style>

</style>