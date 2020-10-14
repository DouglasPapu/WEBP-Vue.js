<template>
 <div>
     <v-main wrap>
         <v-card width="500" shaped elevation="17" flat class="mx-auto mt-9">
             <v-card-title class="justify-center">Join Free</v-card-title>
             <v-card-subtitle class="justify-center">welcome</v-card-subtitle>
             <v-card-text>
                 <v-text-field required v-model="email" label="Email" :rules="emailRules" prepend-icon="account_circle"/>
                 <v-text-field 
                 label="Password" 
                 v-model="password"
                 :type="showPassword ? 'text' : 'password'"
                 prepend-icon="lock" 
                 :append-icon="showPassword ? 'visibility' : 'visibility_off'" 
                 @click:append="showPassword = !showPassword"
                 :rules="passwordRules"
                 required/>
             </v-card-text>
             <v-divider></v-divider>
             <v-card-actions class="justify-center">
                 <v-btn color="primary" class=""><v-icon left>login</v-icon>Login</v-btn>
             </v-card-actions>
              <v-card-actions class="justify-center">
                 <v-btn to="/user" text>Register</v-btn>
             </v-card-actions>
         </v-card>
     </v-main>
 </div>
</template>

<script>
import {db} from "../main"
export default {
data(){
    return {
        showPassword:false,
        email: "",
        password: "",
        emailRules: [
        (email) => !!email || "Email is required.",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Email is invalid",
       ],
       passwordRules: [
           (password) => !!password || "Password is required",
           (password) => password.length >= 8 || "Password must be at least 8 characters"
       ],
    }
},
 created(){
        db.collection("dependencies").get().then((dep) => {
           dep.forEach(doc => {
             this.$store.state.dependencies.push(doc.data());
           })
        });
        
        db.collection("users").get().then((usr) => {
           usr.forEach(doc => {
             this.$store.state.users.push(doc.data());
           })
        });      
    },
}
</script>

<style>
.home-bg{

background-image: url("https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80");
background-repeat: no-repeat;
background-size: cover;
background-attachment: fixed;
background-position: center;
}

</style>