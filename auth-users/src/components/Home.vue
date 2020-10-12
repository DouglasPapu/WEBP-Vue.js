<template>
 <div class="home-bg">
     <v-content>
         <v-card width="500" flat class="mx-auto mt-9 text-center">
             <v-card-title class="">Login</v-card-title>
             <v-card-text>
                 <v-text-field label="Email" prepend-icon="account_circle"/>
                 <v-text-field 
                 label="Password" 
                 :type="showPassword ? 'text' : 'password'"
                 prepend-icon="lock" 
                 :append-icon="showPassword ? 'visibility' : 'visibility_off'" 
                 @click:append="showPassword = !showPassword"/>
             </v-card-text>
             <v-divider></v-divider>
             <v-card-actions>
                 <v-btn color="success">Login</v-btn>
             </v-card-actions>
         </v-card>
     </v-content>
 </div>
</template>

<script>
export default {
data(){
    return {
        showPassword:false,
    }
},
components: {
}
}
</script>

<style>
main{

background-image: url("https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80");
background-repeat: no-repeat;
background-size: cover;
background-attachment: fixed;
background-position: center;
}

</style>