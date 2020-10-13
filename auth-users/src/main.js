import Vue from 'vue';
import App from './App.vue';
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import store from "./store";
import Home from "./components/Home";
import User from "./components/User";
import Dependency from "./components/Dependency";
import Dependencies from "./components/Dependencies";
import Users from "./components/Users";
import firebase from "firebase/app";
import "firebase/firestore";

const routes = [
 {
    path: "/",
    component: Home,
 },
 {
  path: "/user",
  component: User,
},
{
  path: "/dependency",
  component: Dependency,
},
{
  path: "/dependencies",
  component: Dependencies,
},
{
  path: "/users",
  component: Users
}
];

const firebaseConfig = {
  apiKey: "AIzaSyA-XE7fSEWcrNXwkFdbcCCICPKWU_QinIQ",
  authDomain: "auth-users-51de2.firebaseapp.com",
  databaseURL: "https://auth-users-51de2.firebaseio.com",
  projectId: "auth-users-51de2",
  storageBucket: "auth-users-51de2.appspot.com",
  messagingSenderId: "596769938262",
  appId: "1:596769938262:web:55dfa140bf154336e6d4f7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Serve to store, read, delete into basedate.
export const db = firebase.firestore();

Vue.config.productionTip = false

const router = new VueRouter({ routes });

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
