import Vue from 'vue'
import App from './App.vue'
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import store from "./store";
import Home from "./components/Home"
const routes = [
 {
    path: "/",
    component: Home,
 },
];


Vue.config.productionTip = false

const router = new VueRouter({ routes });

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
