<template>
  <v-card width="1300" shaped elevation="17" class="mx-auto mt-9">
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
            <td>{{ item.active }}</td>
            <td>
              <v-icon>edit</v-icon> <v-icon>delete</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {

    }
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