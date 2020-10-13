<template>
<div>
  <v-app-bar
  color="blue"
  app
  dark
  >
  <v-toolbar-title>
    <v-btn text rounded outlined>
      <v-icon left>home</v-icon>
      JD Login
    </v-btn>
 </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-btn to="/" text rounded>Home</v-btn>
  <v-btn to="/user" text rounded>Add User</v-btn>
  <v-btn to="/dependency" text rounded>Add Dependency</v-btn>
  <v-btn to="/dependencies" text rounded>Dependencies</v-btn>
  <v-btn to="/users" text rounded>Users</v-btn>
  </v-app-bar>
</div>
</template>

<script>
export default {
name: "NavBar",
}
</script>

<style>

</style>