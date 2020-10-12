<template>
<v-card width="500" shaped elevation="17" class="mx-auto mt-9">
     <v-card-title class="justify-center">Sign Up</v-card-title>
     <v-card-subtitle class="justify-center">Register a new dependecy</v-card-subtitle>
 <v-form v-model="valid">
  <v-container>
      <v-row>
          <v-col cols="12" md="6">
              <v-text-field required label="Name" prepend-icon="perm_identity"/>
          </v-col>
          <v-col cols="12" md="6">
              <v-text-field required label="Coordinator" prepend-icon="record_voice_over"/>
          </v-col>
      </v-row>
      <v-row>                 
          <v-col cols="12" md="6">
              <v-text-field v-model="location" required label="Location" prepend-icon="location_on"/>
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
        <v-col cols="12" md="6">
            <v-subheader>Max Users</v-subheader>
              <v-slider
                v-model="sliderUser"
                max="200"
                prepend-icon="add_circle_outline"
                thumb-label
            ></v-slider>
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