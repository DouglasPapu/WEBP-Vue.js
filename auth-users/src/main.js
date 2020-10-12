import Vue from 'vue'
import App from './App.vue'
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import store from "./store";
import HelloWorld from "./components/HelloWorld"
const routes = [
  {
    path: "/",
    component: HelloWorld,
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
