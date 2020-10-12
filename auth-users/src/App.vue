<template>
 <v-app id="app">
  <main>
    <div class="app-container">
    <header class="app-header">
      <NavBar></NavBar>
    </header>
      <div class="content">
         <router-view></router-view>
      </div>
    </div>
  </main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar"
export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-image: url("https://images.unsplash.com/photo-1497384401032-2182d2687715?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

</style>
