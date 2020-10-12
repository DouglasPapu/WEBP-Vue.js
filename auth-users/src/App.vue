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
}



</style>
