<template>
<v-app>
    <NavBar></NavBar>
    <div class="content">
     <router-view></router-view>
     </div>
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

.home-bg{

background-image: url("https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80");
background-repeat: no-repeat;
background-size: cover;
background-attachment: fixed;
background-position: center;
}

</style>
