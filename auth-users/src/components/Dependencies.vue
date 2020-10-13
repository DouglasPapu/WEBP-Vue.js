<template>
  <v-card width="1000" shaped elevation="17" class="mx-auto mt-9">
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
          <tr v-for="item in dependencies" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.coordinator }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.active }}</td>
            <td>{{ item.maxUsers }}</td>
            <td><v-icon>edit</v-icon><v-icon>delete</v-icon></td>
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
      dependencies: [
        {
          name: "Carlos",
          coordinator: "prueba",
          location: "nada",
          active: true,
          maxUsers: 20,
        },
        {
          name: "Felipe",
          coordinator: "prueba2",
          location: "nada",
          active: false,
          maxUsers: 47,
        },
      ],
    };
  },
};
</script>

<style>
</style>