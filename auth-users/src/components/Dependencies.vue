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
          <tr v-for="(item,index) in dependencies" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.coordinator }}</td>
            <td>{{ item.location }}</td>
            <td>
              <v-icon :color="item.active ? 'green darken-2' : 'red'">{{item.active ? "verified" : "unpublished"}}</v-icon>
            </td>
            <td>{{ item.amountUsers }}</td>
            <td><v-icon small @click="viewDependency(item)">visibility</v-icon> <v-icon small @click="editDependency(item)">edit</v-icon> <v-icon small @click="dialogDelete = true">delete</v-icon></td>
          </tr>
        </tbody>
        <!-- Dialog to show dependency details-->
            <v-dialog v-model="dialogDetails" max-width="500px">
             <v-card>
              <v-card-title class="headline">Details of {{itemView.name}}</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                   <v-btn color="blue darken-1" text @click="viewItemConfirm">OK</v-btn>
                 <v-spacer></v-spacer>
               </v-card-actions>
              </v-card>
            </v-dialog>
             <!-- Dialog to show warning -->
             <v-dialog v-model="dialogDelete" max-width="500px">
               <v-card>
               <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                 <v-card-actions>
                  <v-spacer></v-spacer>
                   <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                   <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
    };
  },
  methods: {
      closeDelete(){
         this.dialogDelete = false;
      },
      deleteItemConfirm(){
        this.dialogDelete = false;
      },
      viewDependency(item){
        this.itemView = item;
        this.dialogDetails = true;
      },
      viewItemConfirm(){
        this.dialogDetails = false;
      },
  },
   computed:{
      dependencies(){
          return this.$store.state.dependencies;
      }
  },
};
</script>

<style>
</style>