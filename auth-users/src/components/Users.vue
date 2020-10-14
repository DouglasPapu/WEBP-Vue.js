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
    <v-simple-table>
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
            <td><v-icon :color="item.active ? 'green darken-2' : 'red'">{{item.active ? "how_to_reg" : "unpublished"}}</v-icon></td>
            <td>
              <v-icon small @click="viewUser(item)">visibility</v-icon> <v-icon small @click="editUser(item)">edit</v-icon> <v-icon small @click="dialogDelete = true">delete</v-icon>
            </td>
          </tr>
        </tbody>
        <!-- Dialog to show user details-->
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
    }
  },
  methods: {
      closeDelete(){
         this.dialogDelete = false;
      },
      deleteItemConfirm(){
        this.dialogDelete = false;
      },
      viewUser(item){
        this.itemView = item;
        this.dialogDetails = true;
      },
      viewItemConfirm(){
        this.dialogDetails = false;
      },
  },
   computed:{
      users(){
          return this.$store.state.users;
      }
  },
};
</script>

<style>
</style>